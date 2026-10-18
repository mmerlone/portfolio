import { CONSENT_COOKIE_NAMES } from "@/lib/cookies";
import type { AnalyticsConfig, CookieConfig } from "@/types/site";

// Client-safe settings. Client components import this instead of `siteConfig`,
// which builds its navigation from the case-study data and would otherwise ship
// that content to every route.
export const cookieConfig: CookieConfig = {
  analytics: {
    name: CONSENT_COOKIE_NAMES.analytics,
    expiryDays: 365,
  },
  marketing: {
    name: CONSENT_COOKIE_NAMES.marketing,
    expiryDays: 365,
  },
};

export const analyticsConfig: AnalyticsConfig = {
  googleAnalytics: {
    id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? null,
  },
  googleTagManager: {
    id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? null,
  },
  ahrefs: {
    key: process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? null,
  },
};
