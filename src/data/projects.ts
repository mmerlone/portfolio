import { type PortfolioProjectItem } from "@/types/portfolio";

export const projects: PortfolioProjectItem[] = [
  {
    name: "YwyBase",
    description:
      "A Solid Ground to Scale. A comprehensive Next.js application with authentication, Material UI, and modern best practices.",
    demo: "https://ywybase.vercel.app/",
    github: "https://github.com/mmerlone/ywybase",
    technologies: [
      "Next.js 15+",
      "React 19+",
      "Supabase",
      "TailwindCSS",
      "TypeScript",
      "Material UI",
      "Sentry",
      "Pino Logger",
    ],
  },
  {
    name: "mui7-phone-number",
    description:
      "A phone number input component for MUI v7+ with auto-formatting, country selection, and full TypeScript support.",
    demo: "https://ywybase.vercel.app/demos/mui7-phone-number/",
    github: "https://github.com/mmerlone/mui7-phone-number",
    technologies: ["React 19+", "TypeScript", "Material UI v7+"],
  },
  {
    name: "react-tz-globepicker",
    description:
      "Interactive globe picker for React applications that need timezone selection, timezone visualization, or a compact world-time UI.",
    demo: "https://ywybase.vercel.app/demos/react-tz-globepicker/",
    github: "https://github.com/mmerlone/react-tz-globepicker",
    technologies: ["React 19+", "TypeScript"],
  },
]; 