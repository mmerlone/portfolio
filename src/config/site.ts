import { type SiteConfig } from "@/types/site";

export const siteConfig = {
  // Site metadata
  name: "Marcio Merlone",
  // Refactor old "title" to "headline"
  headline:
    "Remote Software Engineer | Full-Stack Development | Cloud Technologies | Problem Solver",
  // New title for meta tags, etc.
  title: "Software Engineer",
  description:
    "A creative and results-oriented Software Engineer with a strong track record of 20+ years in solving complex technical challenges. Expertise in React, TypeScript, Node.js, and cloud technologies. Passionate about building scalable, maintainable, and user-friendly applications.",
  url: "https://your-domain.com",
  ogImage: "https://your-domain.com/og.jpg",
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

  // About section
  about: {
    title: "About Me",
    paragraphs: [
      "With over two decades in the IT field, I've cultivated a deep and diverse professional foundation. My career has spanned critical areas from the foundational days of dial-up internet infrastructure and system administration across various platforms (Linux, Windows, Solaris, FreeBSD) to hands-on software development and team leadership. This breadth of experience has equipped me with a holistic understanding of technology landscapes, fostering a unique ability to bridge gaps between different technical domains and adapt quickly to evolving challenges.",
      "My core expertise lies in building and managing robust, high-performance IT environments. This includes significant experience in network architecture, server administration, virtualization, and implementing critical security measures that have ensured business continuity and supported substantial organizational growth, such as scaling infrastructure to enable over 400% company expansion. I excel at troubleshooting complex issues, optimizing systems for efficiency, and leading initiatives that deliver tangible results, always aiming for stability, reliability, and performance.",
      "In recent years, I've pivoted to focus on modern software development, specializing in front-end technologies like React and TypeScript. This shift allows me to combine my extensive technical background with a passion for crafting user-centric and **accessible** web applications. My full-stack perspective, informed by years of infrastructure and backend work, provides a valuable edge in building well-rounded solutions. I am now eager to leverage this combined expertise to contribute to innovative projects within dynamic, remote teams across the world.",
    ],
  },

  // Credits: Vercel, OpenWeatherMap, Tailwind CSS, Heroicons, FontAwesome, Zenquotes
  // Weather data provided by OpenWeatherMap
  // Icons provided by Heroicons
  // Vercel for hosting
  // Zenquotes API for inspirational quotes
  // FontAwesome for icons
  // Vercel for hosting

  // Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
  credits: [
    {
      name: "OpenWeatherMap",
      description: "Weather data provided by OpenWeatherMap.",
      url: "https://openweathermap.org/",
      icon: "openweathermap.png",
    },
    {
      name: "Heroicons",
      description:
        "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
      url: "https://heroicons.com/",
      icon: "heroicons.svg",
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for creating custom designs.",
      url: "https://tailwindcss.com/",
      icon: "tailwindcss.svg",
    },
    {
      name: "FontAwesome",
      description: "The iconic font and CSS toolkit.",
      url: "https://fontawesome.com/",
      icon: "fontawesome.svg",
    },
    {
      name: "ZenQuotes API",
      description: "Inspirational quotes provided by ZenQuotes API.",
      url: "https://zenquotes.io/",
      icon: "zenquotes.png",
    },
    {
      name: "Vercel",
      description:
        "The platform for frontend developers, providing the best developer experience and performance.",
      url: "https://vercel.com/",
      icon: "vercel.svg",
    },
  ],
} as const satisfies SiteConfig;
