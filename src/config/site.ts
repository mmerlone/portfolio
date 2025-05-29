import { type SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  // Site metadata
  name: "Marcio Merlone",
  headline:
    "Remote Software Engineer | Full-Stack Development | Cloud Technologies | Problem Solver",
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
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Contributions", href: "#contributions" }, // <-- Add this line
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

  // Quotes configuration
  // To disable:
  // quotes: null,
  // or just remove the quotes property entirely
  quotes: {
    default: {
      q: "640 k ought to be enough for anybody.",
      a: "Bill Gates",
      h: "",
    },
    list: [
      {
        q: "640 k ought to be enough for anybody.",
        a: "Bill Gates",
        h: "",
      },
      {
        q: "Talk is cheap. Show me the code.",
        a: "Linus Torvalds",
        h: "",
      },
      // Add more quotes as desired
    ],
  },
};
