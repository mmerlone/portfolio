import { type SiteConfig } from "@/types/site";

export const EFFECTS_KEY = "effects-preference";

export const siteConfig: SiteConfig = {
  // Site metadata
  name: "Marcio Merlone",
  headline: "Solving Complex Technical Challenges for Growing Businesses",
  title: "Software Engineer",
  description:
    "A creative and results-oriented Software Engineer with a strong track record of 20+ years in solving complex technical challenges. Expertise in React, TypeScript, Node.js, and cloud technologies. Passionate about building scalable, maintainable, and user-friendly applications.",
  url: "https://mmerlone.dev.br",
  ogImage: "https://mmerlone.dev.br/images/og/og.jpg",
  // Contact information
  contact: {
    email: "mmerlone@gmail.com",
    phone: "",
    location: "Remote",
  },

  // Social media links
  social: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/mmerlone",
      icon: "linkedin",
    },
    { name: "GitHub", url: "https://github.com/mmerlone", icon: "github" },
    {
      name: "Instagram",
      url: "https://instagram.com/mmerlone",
      icon: "instagram",
    },
  ],

  // External links
  links: {
    resume: "/documents/MarcioMerlone.pdf",
    linktree: "https://linktr.ee/mmerlone",
  },

  // Image paths
  images: {
    profile: "/images/profile/profile.png",
  },

  // Navigation
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contributions", href: "/#contributions" },
    { label: "Skills", href: "/#skills" },
    { label: "Experience", href: "/#experience" },
    { label: "Credits", href: "/#credits" },
    { label: "Contact", href: "/#contact" },
    { label: "Presentation", href: "/demo/presentation" },
  ],

  // Footer configuration
  footer: {
    copyright: {
      text: "All rights reserved.",
    },
  },

  // New cookie configuration:
  cookie: {
    name: "mmerlone-dev-br-analytics-consent",
    expiryDays: 365,
  },

  // Analytics configuration
  // Google Analytics and Google Tag Manager IDs
  analytics: {
    googleAnalytics: {
      id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || null,
    },
    googleTagManager: {
      id: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || null,
    },
  },

  // GitHub repository info
  github: {
    repoUrl: "https://github.com/mmerlone/portfolio",
  },

  // Effects configuration
  effects: {
    default: "EXPERIMENTAL",
  },

  // CTA configuration
  cta: {
    text: "Facing an urgent migration or security challenge?",
    linkText: "Schedule a Free Consultation",
    link: "https://calendly.com/mmerlone",
  },
};
