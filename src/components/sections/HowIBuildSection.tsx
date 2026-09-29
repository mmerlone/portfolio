import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { howIBuildPrinciples } from "@/data/howIBuildPrinciples";

interface HowIBuildSectionProps {
  className?: string;
}

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
          {howIBuildPrinciples.map((principle, idx) => (
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
