import { type SiteConfig } from '@/types/site';

export const siteConfig = {
  // Site metadata
  name: "Marcio Merlone - Software Engineer Portfolio",
  title: "Remote Software Engineer | Full-Stack Development | Cloud Technologies | Problem Solver",
  description: "A creative and results-oriented Software Engineer with a strong track record of 20+ years in solving complex technical challenges. Expertise in React, TypeScript, Node.js, and cloud technologies. Passionate about building scalable, maintainable, and user-friendly applications.",
  url: "https://your-domain.com",
  ogImage: "https://your-domain.com/og.jpg",

  // Contact information
  contact: {
    email: "mmerlone@gmail.com",
    phone: "+55 41 99536-8488",
    location: "Remote",
  },

  // Social media links
  social: {
    github: "https://github.com/mmerlone",
    linkedin: "https://linkedin.com/in/mmerlone",
    twitter: "https://twitter.com/mmerlone",
  },

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
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ],

  // Footer configuration
  footer: {
    copyright: {
      text: "All rights reserved.",
    },
    social: [
      {
        name: "GitHub",
        href: "https://github.com/mmerlone",
        icon: "FaGithub",
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/mmerlone",
        icon: "FaLinkedin",
      },
      {
        name: "Twitter",
        href: "https://twitter.com/mmerlone",
        icon: "FaTwitter",
      },
    ],
  },

  // About section
  about: {
    title: "About Me",
    paragraphs: [
      "With over two decades in the IT field, I've cultivated a deep and diverse professional foundation. My career has spanned critical areas from the foundational days of dial-up internet infrastructure and system administration across various platforms (Linux, Windows, Solaris, FreeBSD) to hands-on software development and team leadership. This breadth of experience has equipped me with a holistic understanding of technology landscapes, fostering a unique ability to bridge gaps between different technical domains and adapt quickly to evolving challenges.",
      "My core expertise lies in building and managing robust, high-performance IT environments. This includes significant experience in network architecture, server administration, virtualization, and implementing critical security measures that have ensured business continuity and supported substantial organizational growth, such as scaling infrastructure to enable over 400% company expansion. I excel at troubleshooting complex issues, optimizing systems for efficiency, and leading initiatives that deliver tangible results, always aiming for stability, reliability, and performance.",
      "In recent years, I've pivoted to focus on modern software development, specializing in front-end technologies like React and TypeScript. This shift allows me to combine my extensive technical background with a passion for crafting user-centric and **accessible** web applications. My full-stack perspective, informed by years of infrastructure and backend work, provides a valuable edge in building well-rounded solutions. I am now eager to leverage this combined expertise to contribute to innovative projects within dynamic, remote teams across the world."
    ],
  },
} as const satisfies SiteConfig;
 