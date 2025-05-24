"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";
import { getCookie } from "@/lib/cookies";

type AnalyticsWrapperProps = object;

export default function AnalyticsWrapper({}: AnalyticsWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const cookie = getCookie("portfolioTosAccepted");
    if (cookie === "true") {
      setIsAnalyticsAllowed(true);
    }
  }, []);

  if (!hasMounted) return null;
  if (!isAnalyticsAllowed) return null;

  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
