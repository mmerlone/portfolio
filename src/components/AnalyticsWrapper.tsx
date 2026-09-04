"use client";

import { type ReactElement } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { getCookie } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

export default function AnalyticsWrapper(): ReactElement | null {
  const hasMounted = useIsHydrated();

  const gtmId = siteConfig.analytics?.googleTagManager.id ?? null;
  const gaId = siteConfig.analytics?.googleAnalytics.id ?? null;

  if (!hasMounted) {
    return null;
  }

  const cookie = getCookie("portfolioTosAccepted");
  const userAgent = navigator.userAgent || "";

  const isBot =
    /Googlebot|AdsBot|Mediapartners-Google|Google Tag Manager/i.test(userAgent);

  if (cookie !== "true" && !isBot) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gtmId && <GoogleTagManager gtmId={gtmId} dataLayerName="dataLayer" />}
      {gaId && <GoogleAnalytics gaId={gaId} dataLayerName="dataLayer" />}
    </>
  );
}
