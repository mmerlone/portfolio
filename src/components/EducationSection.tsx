import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { GraduationCapIcon } from "@phosphor-icons/react/ssr";

interface EducationSectionProps {
  className?: string;
}

export default function EducationSection({
  className,
}: EducationSectionProps): ReactElement {
  return (
    <section id="education" className={cn("relative py-16", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Education</SectionTitle>
        <div className="mx-auto max-w-3xl space-y-6">
          {portfolio.education.map((entry) => (
            <article
              key={`${entry.institution}-${entry.years}`}
              className="border-border bg-surface flex gap-4 rounded-lg border p-6"
            >
              <div className="bg-accent-soft text-accent-soft-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <GraduationCapIcon size={20} weight="bold" />
              </div>
              <div>
                <h3 className="text-foreground text-lg font-semibold">
                  {entry.program}
                </h3>
                <p className="text-muted-foreground">{entry.institution}</p>
                <p className="text-accent text-sm">{entry.years}</p>
                {entry.notes && (
                  <p className="text-subtle-foreground mt-1 text-sm">
                    {entry.notes}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
