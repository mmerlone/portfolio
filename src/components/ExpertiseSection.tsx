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
              className="border-border bg-surface rounded-lg border p-8"
            >
              <h3 className="text-foreground mb-3 text-xl font-semibold">
                {area.name}
              </h3>
              <p className="text-muted-foreground mb-4">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.keywords.map((keyword, idx) => (
                  <span
                    key={`${area.name}-${keyword}-${idx}`}
                    className="bg-accent-soft text-accent-soft-foreground inline-block rounded px-2 py-1 text-xs font-medium"
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
