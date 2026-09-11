import { type PortfolioWorkItem } from "@/types/portfolio";

export const projects: PortfolioWorkItem[] = [
  {
    kind: "owned",
    name: "YwyBase",
    description:
      "A Solid Ground to Scale. A comprehensive Next.js application with authentication, Material UI, and modern best practices.",
    role: "I designed and built YwyBase from scratch as a reference application for modern full-stack engineering.",
    context:
      "A production-grade application is needed to validate authentication, data layer, UI theming, and observability patterns in a single cohesive codebase.",
    constraints: [
      "Must work end-to-end with a hosted database and auth provider.",
      "UI must be accessible and themeable without duplicated styling systems.",
      "Error reporting and logging must be safe for production.",
    ],
    decisions: [
      "Next.js App Router with Server and Client components where each is needed.",
      "Supabase for authentication and Postgres-backed data.",
      "Material UI paired with TailwindCSS for component library and utility styling.",
      "Sentry for error tracking and Pino Logger for structured server-side logs.",
    ],
    tradeoffs: [
      "Choosing a hosted auth/data provider trades full infrastructure ownership for faster iteration and reliability.",
      "Combining two styling systems requires discipline to avoid conflicting utility and component styles.",
    ],
    outcome:
      "A working, deployable reference application that exercises the full stack and serves as the evidence base for the YwyBase case study.",
    demo: "https://ywybase.vercel.app/",
    github: "https://github.com/mmerlone/ywybase",
    otherLinks: [
      {
        label: "Architecture and design",
        url: "https://ywybase.vercel.app/about",
      },
    ],
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
    kind: "owned",
    name: "@mmerlone/mui7-phone-number",
    description:
      "A phone number input component for MUI v7+ with auto-formatting, country selection, and full TypeScript support.",
    role: "I designed, implemented, documented, and published this component as the maintainer.",
    context:
      "MUI v7 changed its API surface, and phone inputs need to stay compatible with the current major while remaining easy to use.",
    constraints: [
      "Must type-check cleanly under React 19 and TypeScript.",
      "Country selection and formatting must not depend on heavy runtime dependencies.",
      "The public API must be small and stable across minor versions.",
    ],
    decisions: [
      "Built on top of MUI v7 components rather than a custom input primitive.",
      "Shipped a self-contained formatting helper instead of bundling a locale data set.",
      "Exposed minimal props with sensible defaults to keep the API predictable.",
    ],
    tradeoffs: [
      "Limiting the API surface means some caller customization requires composition rather than props.",
      "Reusing MUI theming means the component does not solve styling outside the MUI ecosystem.",
    ],
    outcome:
      "A typed, auto-formatting phone input that installs cleanly into MUI v7+ applications and is documented with usage examples.",
    demo: "https://ywybase.vercel.app/demos/mui7-phone-number/",
    github: "https://github.com/mmerlone/mui7-phone-number",
    npm: "https://www.npmjs.com/package/@mmerlone/mui7-phone-number",
    technologies: ["React 19+", "TypeScript", "Material UI v7+"],
  },
  {
    kind: "owned",
    name: "@mmerlone/react-tz-globepicker",
    description:
      "Interactive globe picker for React applications that need timezone selection, timezone visualization, or a compact world-time UI.",
    role: "I designed, implemented, documented, and published this component as the maintainer.",
    context:
      "Applications that deal with timezones often need a compact, visual way to pick a timezone instead of scrolling through a long textual list.",
    constraints: [
      "Must remain lightweight and tree-shakeable.",
      "Rendering must stay performant across a large set of countries and timezones.",
      "The component must be usable with React 19 and TypeScript.",
    ],
    decisions: [
      "Rendered a globe projection as a lightweight SVG rather than a WebGL or 3D scene.",
      "Derived timezone data from a compact static dataset instead of a runtime API call.",
      "Exposed a single controlled component with a stable selection callback.",
    ],
    tradeoffs: [
      "A static SVG globe trades some visual realism for bundle size and rendering speed.",
      "A single controlled API means callers own their own state management.",
    ],
    outcome:
      "A small, dependency-light globe picker that renders timezones visually and integrates into React 19 applications without extra runtime cost.",
    demo: "https://ywybase.vercel.app/demos/react-tz-globepicker/",
    github: "https://github.com/mmerlone/react-tz-globepicker",
    npm: "https://www.npmjs.com/package/@mmerlone/react-tz-globepicker",
    technologies: ["React 19+", "TypeScript"],
  },
  {
    kind: "external",
    name: "Headless CMS Migration: From WordPress to Contentstack",
    publisher: "ArcTouch",
    author: "Marcio Merlone",
    articleUrl: "https://arctouch.com/blog/headless-cms-migration",
    authorProfileUrl: "https://arctouch.com/blog/author/marcio-merlone",
    description:
      "An engineering case study documenting the modeling, extraction, validation, and migration of content from WordPress to Contentstack, including 980 images and documents totaling 683 MB.",
    role: "I authored the data migration script for ArcTouch's WordPress-to-Contentstack migration, engineered for maximum data extraction, normalization, and curation while filtering out years of accumulated database pollution, and I authored the published engineering case study documenting the approach and outcomes. The new Contentstack content schema was designed and built by the ArcTouch team.",
    technologies: [
      "WordPress",
      "Contentstack",
      "Data Migration",
      "JavaScript",
      "PHP",
    ],
  },
];
