import type { ComponentType } from "react";

export const Analytics: ComponentType<Record<string, never>> = () => {
  return null;
};
export const injectAnalytics = (): void => {
  // noop
};