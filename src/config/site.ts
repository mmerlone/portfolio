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
    { label: "About", href: "/#about" },
    { label: "Expertise", href: "/#expertise" },
    { label: "Experience", href: "/#experience" },
    { label: "Challenges", href: "/#challenges" },
    { label: "Projects", href: "/#projects" },
    { label: "Skills", href: "/#skills" },
    { label: "Credits", href: "/#credits" },
    { label: "Contact", href: "/#contact" },
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
  },

  // GitHub repository info
  github: {
    repoUrl: "https://github.com/mmerlone/portfolio",
  },

  // CTA configuration
  cta: {
    text: "Let’s build a resilient architecture together.",
    linkText: "Let's talk!",
    link: "https://calendly.com/mmerlone",
  },

  // Search metadata
  seo: {
    title: "Marcio Merlone — Software Engineer & Platform Architect",
    description:
      "Software engineer with 20+ years of experience building resilient platforms, reliable infrastructure, and accessible web applications.",
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
