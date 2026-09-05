"use client";

import { useEffect, useState, type ReactElement } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { COOKIE_CHANGE_EVENT, getCookie } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

export default function AnalyticsWrapper(): ReactElement | null {
  const hasMounted = useIsHydrated();
  const [hasConsent, setHasConsent] = useState(false);

  const gtmId = siteConfig.analytics?.googleTagManager.id ?? null;
  const gaId = siteConfig.analytics?.googleAnalytics.id ?? null;
  const cookieName = siteConfig.cookie.name;

  useEffect(() => {
    if (!hasMounted) return;

    const updateConsent = (): void => {
      setHasConsent(getCookie(cookieName) === "true");
    };

    updateConsent();
    window.addEventListener(COOKIE_CHANGE_EVENT, updateConsent);
    return (): void => {
      window.removeEventListener(COOKIE_CHANGE_EVENT, updateConsent);
    };
  }, [cookieName, hasMounted]);

  if (!hasMounted || !hasConsent) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gtmId ? (
        <GoogleTagManager gtmId={gtmId} dataLayerName="dataLayer" />
      ) : gaId ? (
        <GoogleAnalytics gaId={gaId} dataLayerName="dataLayer" />
      ) : null}
    </>
  );
}
