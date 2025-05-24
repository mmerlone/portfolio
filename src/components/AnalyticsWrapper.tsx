"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";
import { getCookie } from "@/lib/cookies";
import { fetchGtmId } from "@/lib/gtm";

type AnalyticsWrapperProps = object;

export default function AnalyticsWrapper({}: AnalyticsWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);
  const [gtmId, setGtmId] = useState<string>("");

  useEffect(() => {
    setHasMounted(true);
    const cookie = getCookie("portfolioTosAccepted");
    if (cookie === "true") {
      setIsAnalyticsAllowed(true);
    }
    async function loadGtmId() {
      try {
        const id = await fetchGtmId();
        setGtmId(id);
      } catch (error: unknown) {
        console.error("Error fetching GTM ID:", error);
      }
    }
    loadGtmId();
  }, []);

  if (!hasMounted) return null;
  if (!isAnalyticsAllowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
}
