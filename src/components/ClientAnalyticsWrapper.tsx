"use client";

import dynamic from "next/dynamic";

const DynamicAnalyticsWrapper = dynamic(
  () => import("@/components/AnalyticsWrapper"),
  { ssr: false }
);

export default function ClientAnalyticsWrapper() {
  return <DynamicAnalyticsWrapper />;
}
