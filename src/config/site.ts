import { type SiteConfig } from "@/types/site";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.BING_SITE_VERIFICATION;

export const siteConfig: SiteConfig = {
  // Site metadata
  url: "https://mmerlone.dev.br",
  ogImage: "https://mmerlone.dev.br/images/og/og.jpg",

  // Image paths
  images: {
    profile: "/images/profile/profile.png",
  },

  // Navigation
  navigation: [
    { label: "About", href: "/about" },
    { label: "Selected engineering work", href: "/#selected-engineering-work" },
    { label: "How I build", href: "/#how-i-build" },
    { label: "My path", href: "/#my-path" },
    { label: "Selected experience", href: "/#selected-experience" },
    { label: "Skills", href: "/#skills" },
    { label: "Credits", href: "/about#credits" },
    { label: "Contact", href: "/contact" },
    { label: "Under the Hood", href: "/under-the-hood" },
  ],

  // Footer configuration
  footer: {
    copyright: {
      text: "All rights reserved.",
    },
  },

  // Cookie configuration
  cookie: {
    name: "mmerlone-dev-br-analytics-consent",
    expiryDays: 365,
  },

  // Analytics configuration
  analytics: {
    googleAnalytics: {
      id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? null,
    },
    googleTagManager: {
      id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? null,
    },
    ahrefs: {
      key: process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY ?? null,
    },
  },

  // CTA configuration
  cta: {
    text: "Let's build a resilient architecture together.",
    linkText: "Let's talk!",
    link: "https://calendly.com/mmerlone",
  },

  // Search metadata
  seo: {
    title: "Marcio Merlone — Senior Software Engineer",
    description:
      "Senior Software Engineer building resilient products from infrastructure to interface.",
    ...(googleSiteVerification || bingSiteVerification
      ? {
          verification: {
            ...(googleSiteVerification
              ? { google: googleSiteVerification }
              : {}),
            ...(bingSiteVerification ? { bing: bingSiteVerification } : {}),
          },
        }
      : {}),
  },
};
