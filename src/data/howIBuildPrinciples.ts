export interface HowIBuildPrinciple {
  title: string;
  description: string;
  evidence: string;
  evidenceHref: string;
}

export const howIBuildPrinciples: HowIBuildPrinciple[] = [
  {
    title: "Make structure explicit",
    description:
      "Architecture should be visible and verifiable, not implied. YwyBase demonstrates a typed, layered Next.js foundation with authentication, UI system, and observability baked in — so the structure carries the team, not tribal knowledge.",
    evidence: "YwyBase architecture",
    evidenceHref: "#selected-engineering-work",
  },
  {
    title: "Treat accessibility as architecture",
    description:
      "Accessibility is not a checklist — it is a structural constraint that shapes every component. This portfolio and the ArcTouch client work are built on semantic HTML, keyboard navigation, and WCAG-aligned patterns from day one.",
    evidence: "Portfolio & ArcTouch work",
    evidenceHref: "#selected-experience",
  },
  {
    title: "Design stable reusable APIs",
    description:
      "Library APIs should survive version churn. The react-tz-globepicker and mui7-phone-number packages target React 19 and MUI 7 with strict TypeScript contracts, automated releases, and documentation that keeps consumers productive across upgrades.",
    evidence: "Published npm packages",
    evidenceHref: "#selected-engineering-work",
  },
  {
    title: "Automate repeatable migration and validation",
    description:
      "Large-scale content migrations demand scriptable, auditable pipelines. The Cirrus Aircraft WordPress-to-Contentstack migration used engineered extraction, normalization, and curation scripts that filtered years of database pollution — repeatable, not manual.",
    evidence: "Cirrus migration article",
    evidenceHref: "#headless-cms-migration-article",
  },
  {
    title: "Live with operational decisions",
    description:
      "Twenty years of industrial and infrastructure engineering taught me that every choice has a runtime cost. From on-premise email clusters to cloud migrations, I optimize for the operator who inherits the system — reliability, observability, and graceful degradation over cleverness.",
    evidence: "Industrial & infrastructure background",
    evidenceHref: "#selected-experience",
  },
];
