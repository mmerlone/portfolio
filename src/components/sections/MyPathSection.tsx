import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { pathStages } from "@/data/pathStages";
import { cn } from "@/lib/cn";

interface MyPathSectionProps {
  className?: string;
}

export default function MyPathSection({
  className,
}: MyPathSectionProps): ReactElement {
  return (
    <section
      id="my-path"
      aria-labelledby="my-path-title"
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="my-path-title">My Path</SectionTitle>
        <div className="mx-auto max-w-4xl space-y-12">
          {pathStages.map((stage, idx) => (
            <article
              key={idx}
              className="border-border bg-surface rounded-lg border p-8"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-foreground text-xl font-semibold">
                  {stage.title}
                </h3>
                <span className="text-accent text-sm font-medium">
                  {stage.period}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{stage.description}</p>
              <ul className="text-muted-foreground mb-4 list-disc space-y-1 pl-5 text-sm">
                {stage.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {stage.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="bg-surface-raised text-muted-foreground inline-block rounded px-2 py-0.5 text-xs"
                  >
                    {tech}
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
