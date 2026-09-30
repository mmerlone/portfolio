"use client";

import { useEffect, useState, type ReactElement } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { COOKIE_CHANGE_EVENT, getConsent } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

export default function AnalyticsWrapper(): ReactElement | null {
  const hasMounted = useIsHydrated();
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const gtmId = siteConfig.analytics?.googleTagManager.id ?? null;
  const gaId = siteConfig.analytics?.googleAnalytics.id ?? null;
  const ahrefsKey = siteConfig.analytics?.ahrefs.key ?? null;

  useEffect(() => {
    if (!hasMounted) return;

    const updateConsent = (): void => {
      setAnalyticsConsent(getConsent("analytics"));
      setMarketingConsent(getConsent("marketing"));
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
            <GoogleTagManager gtmId={gtmId} dataLayerName="dataLayer" />
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
