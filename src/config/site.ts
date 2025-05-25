import { type SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  // Site metadata
  name: "Marcio Merlone",
  headline:
    "Remote Software Engineer | Full-Stack Development | Cloud Technologies | Problem Solver",
  title: "Software Engineer",
  description:
    "A creative and results-oriented Software Engineer with a strong track record of 20+ years in solving complex technical challenges. Expertise in React, TypeScript, Node.js, and cloud technologies. Passionate about building scalable, maintainable, and user-friendly applications.",
  url: "https://your-domain.com",
  ogImage: "https://mmerlone.dev.br/images/og/og.jpg",
  city: "Araucária, PR, Brazil",

  // Contact information
  contact: {
    email: "mmerlone@gmail.com",
    phone: "+55 41 99536-8488",
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
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Credits", href: "#credits" },
    { name: "Contact", href: "#contact" },
  ],

  // Footer configuration
  footer: {
    copyright: {
      text: "All rights reserved.",
    },
  },

  // New cookie configuration:
  cookie: {
    name: "mmerlone-analytics-consent",
    expiryDays: 365,
  },

  // Weather API key
  weather: {
    apiKey: process.env.WEATHER_API_KEY || null,
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
};
