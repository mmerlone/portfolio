import { type ReactElement } from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

interface ResumeSectionProps {
  className?: string;
}

export default function ResumeSection({
  className,
}: ResumeSectionProps): ReactElement {
  const { resume } = portfolio.basic;

  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="resume-title">Résumé</SectionTitle>
        <div className="mx-auto max-w-3xl">
          <article className="border-border bg-surface rounded-lg border p-8">
            <h3 className="text-foreground mb-4 text-xl font-semibold">
              Download Résumé
            </h3>
            <p className="text-muted-foreground mb-6">
              A concise PDF summary of my professional experience, education,
              and certifications.
            </p>
            <a
              href={resume}
              type="application/pdf"
              download
              rel="noopener noreferrer"
              title="Download the résumé as a PDF document"
              className="cta-link bg-action text-action-foreground hover:bg-action-hover inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors duration-200"
            >
              Download Résumé (PDF)
              <ArrowSquareOutIcon size={16} weight="bold" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
