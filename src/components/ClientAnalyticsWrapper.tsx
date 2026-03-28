"use client";

import dynamic from "next/dynamic";
import type { ReactElement } from "react";

const DynamicAnalyticsWrapper = dynamic(
  () => import("@/components/AnalyticsWrapper"),
  { ssr: false }
);

export default function ClientAnalyticsWrapper(): ReactElement {
  return <DynamicAnalyticsWrapper />;
}
