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
            <div
              key={area.name}
              className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h3 className="relative mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                {area.name}
              </h3>
              <p className="relative mb-4 text-gray-600 dark:text-gray-300">
                {area.description}
              </p>
              <div className="relative flex flex-wrap gap-2">
                {area.keywords.map((keyword, idx) => (
                  <span
                    key={`${area.name}-${keyword}-${idx}`}
                    className="inline-block rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/40 dark:text-orange-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
