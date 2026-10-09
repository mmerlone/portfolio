import { type Portfolio } from "@/types/portfolio";
import { experiences } from "@/data/experiences";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { challenges } from "@/data/challenges";

/**
 * Source-of-truth portfolio data.
 *
 * This exported `portfolio` object is typed as `Portfolio` and used by
 * the application to render resume and profile sections. Keep this file
 * in sync with `src/types/portfolio.ts` when fields change.
 *
 * @type {Portfolio}
 * @readonly
 */
export const portfolio: Portfolio = {
  basic: {
    name: "Marcio Merlone",
    title: "Senior Software Engineer",
    label: "I build software with a systems engineer's perspective.",
    location: "Araucária, PR, Brazil — Curitiba Area, Brazil",
    contact: {
      email: "mmerlone@gmail.com",
      linkedin: "https://www.linkedin.com/in/mmerlone",
      website: "https://mmerlone.dev.br/",
    },
    summary:
      "From industrial automation to global frontend platforms — 20+ years evolving mission-critical systems into resilient, accessible products. I bring a systems engineer's perspective to modern software: make structure explicit, treat accessibility as architecture, design stable reusable APIs, automate repeatable validation, and live with operational decisions.",
    roleTitles: [
      "Staff Software Engineer",
      "Software Architect",
      "Application Architect",
      "Platform Engineer",
      "Platform Architect",
      "Solutions Architect",
      "Principal Software Engineer",
      "Principal Frontend Engineer",
      "Lead Software Engineer",
      "Tech Lead",
      "Site Reliability Engineer",
      "Reliability Engineer",
      "Cloud Architect",
      "Infrastructure Architect",
      "Enterprise Architect",
      "IT Infrastructure Manager",
      "Head of IT",
      "Systems Integration Architect",
      "Infrastructure Security Engineer",
      "Digital Transformation Consultant",
      "Technical Product Manager",
      "Technical Product Owner",
      "IT/OT Architect",
      "Industrial Technology Architect",
    ],
    resume: "/documents/MarcioMerlone.pdf",
    social: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mmerlone",
      },
      {
        name: "GitHub",
        url: "https://github.com/mmerlone",
      },
      {
        name: "Personal Website",
        url: "https://mmerlone.dev.br/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/mmerlone/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/mmerlone",
      },
    ],
  },
  professionalExperience: experiences,
  challenges: challenges,
  openSourceProjects: projects,
  education: education,
  languages: [
    { language: "Portuguese", level: "Native or Bilingual" },
    { language: "English", level: "Full Professional / Fluent (C1)" },
    { language: "Spanish", level: "Elementary / Basic" },
  ],
  certifications: [
    "ISO 9001:2008 Internal Auditor",
    "Microsoft Certified Professional (ID #2432097, 2003)",
    "Various Microsoft courses (Windows 2000 support, networking, SQL Server 2000)",
    "SQL database introduction",
    "Introduction to Project Management (PMBOK)",
    "React, ES6+, Agile, Scrum",
  ],
  additionalInformation:
    "Hobbies include audio, acoustics, electronics, ecotourism, and everything else related to technology and the world. Interests include music, movies, TV shows, astronomy, and science.",
};
