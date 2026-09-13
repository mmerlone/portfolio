import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";
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
    {
      label: "Me",
      href: "/#top",
      group: "sections",
    },
    {
      label: "Selected engineering work",
      shortLabel: "Engineering",
      href: "/#selected-engineering-work",
      group: "sections",
    },
    { label: "How I build", href: "/#how-i-build", group: "sections" },
    { label: "My path", href: "/#my-path", group: "sections" },
    {
      label: "Selected experience",
      shortLabel: "Experience",
      href: "/#selected-experience",
      group: "sections",
    },
    { label: "Skills", href: "/#skills", group: "sections" },
    { label: "Résumé", href: "/#resume", group: "sections" },
    {
      label: "Case studies",
      group: "case-studies",
      children: caseStudies.map((caseStudy) => ({
        label: caseStudy.name,
        href: getCaseStudyHref(caseStudy),
      })),
    },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
    // { label: "Under the Hood", href: "/under-the-hood" },
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
