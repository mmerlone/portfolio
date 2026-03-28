"use client";

import { type ReactElement, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { getCookie } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

export default function AnalyticsWrapper(): ReactElement | null {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);

  const gtmId = siteConfig.analytics?.googleTagManager.id ?? null;
  const gaId = siteConfig.analytics?.googleAnalytics.id ?? null;

  useEffect(() => {
    setHasMounted(true);
    const cookie = getCookie("portfolioTosAccepted");
    const userAgent = navigator.userAgent || "";

    const isBot =
      /Googlebot|AdsBot|Mediapartners-Google|Google Tag Manager/i.test(
        userAgent,
      );
    if (cookie === "true" || isBot) {
      setIsAnalyticsAllowed(true);
    }
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (!isAnalyticsAllowed) {
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
