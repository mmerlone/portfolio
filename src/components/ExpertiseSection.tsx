import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

interface ExpertiseSectionProps {
  className?: string;
}

export default function ExpertiseSection({
  className,
}: ExpertiseSectionProps): ReactElement {
  const { expertise } = portfolio.basic;

  return (
    <section id="expertise" className={cn("relative py-16", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Core Expertise</SectionTitle>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((area) => (
            <article
              key={area.name}
              className="border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                {area.name}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.keywords.map((keyword, idx) => (
                  <span
                    key={`${area.name}-${keyword}-${idx}`}
                    className="inline-block rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/40 dark:text-orange-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
