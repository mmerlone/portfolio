import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface HowIBuildSectionProps {
  className?: string;
}

interface HowIBuildPrinciple {
  title: string;
  description: string;
  evidence: string;
  evidenceHref: string;
}

const principles: HowIBuildPrinciple[] = [
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

export default function HowIBuildSection({
  className,
}: HowIBuildSectionProps): ReactElement {
  return (
    <section
      id="how-i-build"
      aria-labelledby="how-i-build-title"
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="how-i-build-title">How I build</SectionTitle>
        <div className="mx-auto max-w-5xl space-y-8">
          {principles.map((principle, idx) => (
            <article
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {principle.title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {principle.description}
              </p>
              <a
                href={principle.evidenceHref}
                className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
              >
                Evidence: {principle.evidence}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
