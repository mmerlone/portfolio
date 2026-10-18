"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import {
  COOKIE_CHANGE_EVENT,
  deleteGoogleCookies,
  getConsent,
} from "@/lib/cookies";
import { analyticsConfig } from "@/config/tracking";

declare global {
  interface Window {
    // Defined by the Google tag snippet (see GTAG_BRIDGE / @next/third-parties).
    gtag?: (...command: unknown[]) => void;
  }
}

// Google's documented gtag() definition. Rendered next to GTM so a consent
// update can be sent later; it must push the `arguments` object, not an array.
const GTAG_BRIDGE =
  "window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};";

interface ConsentSnapshot {
  readonly analytics: boolean;
  readonly marketing: boolean;
}

const readConsent = (): ConsentSnapshot => ({
  analytics: getConsent("analytics"),
  marketing: getConsent("marketing"),
});

// Only a tracker that was actually rendered can keep running after a revoke.
const hasMarketingTracker = (): boolean =>
  [
    analyticsConfig.googleTagManager.id,
    analyticsConfig.googleAnalytics.id,
    analyticsConfig.ahrefs.key,
  ].some(Boolean);

// Supported Google opt-outs; they stop collection but cannot unload the script.
const disableGoogleCollection = (): void => {
  const { googleTagManager, googleAnalytics } = analyticsConfig;

  if (googleTagManager.id) {
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  } else if (googleAnalytics.id) {
    Reflect.set(window, `ga-disable-${googleAnalytics.id}`, true);
  }

  // Catch cookies written between the revocation and this opt-out.
  deleteGoogleCookies();
};

export default function AnalyticsWrapper(): ReactElement | null {
  const hasMounted = useIsHydrated();
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const appliedConsent = useRef<ConsentSnapshot | null>(null);
  const reloadScheduled = useRef(false);

  const gtmId = analyticsConfig.googleTagManager.id;
  const gaId = analyticsConfig.googleAnalytics.id;
  const ahrefsKey = analyticsConfig.ahrefs.key;

  useEffect(() => {
    if (!hasMounted) return;

    const updateConsent = (): void => {
      const next = readConsent();
      const previous = appliedConsent.current;
      appliedConsent.current = next;

      setAnalyticsConsent(next.analytics);
      setMarketingConsent(next.marketing);

      // The first read is not a transition: nothing was rendered before it.
      if (!previous) return;

      const marketingRevoked =
        previous.marketing && !next.marketing && hasMarketingTracker();
      const analyticsRevoked = previous.analytics && !next.analytics;

      if (marketingRevoked) disableGoogleCollection();

      // Vercel Analytics/Speed Insights and Ahrefs expose no revoke API, so
      // only a reload stops them. It is deferred so that a save which writes
      // both categories finishes writing before the page goes away.
      if ((marketingRevoked || analyticsRevoked) && !reloadScheduled.current) {
        reloadScheduled.current = true;
        queueMicrotask(() => {
          window.location.reload();
        });
      }
    };

    updateConsent();
    window.addEventListener(COOKIE_CHANGE_EVENT, updateConsent);
    return (): void => {
      window.removeEventListener(COOKIE_CHANGE_EVENT, updateConsent);
    };
  }, [hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {analyticsConsent && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      {marketingConsent && (
        <>
          {gtmId ? (
            <>
              <Script
                id="gtag-bridge"
                dangerouslySetInnerHTML={{ __html: GTAG_BRIDGE }}
              />
              <GoogleTagManager gtmId={gtmId} dataLayerName="dataLayer" />
            </>
          ) : gaId ? (
            <GoogleAnalytics gaId={gaId} dataLayerName="dataLayer" />
          ) : null}
          {ahrefsKey ? (
            <script
              src="https://analytics.ahrefs.com/analytics.js"
              data-key={ahrefsKey}
              async
            />
          ) : null}
        </>
      )}
    </>
  );
}
