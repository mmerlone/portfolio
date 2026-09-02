import { type ReactElement } from "react";
import Image from "next/image";
import { BriefcaseIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import type { PortfolioExperienceItem } from "@/types/portfolio";

interface ExperienceSectionProps {
  className?: string;
}

export default function ExperienceSection({
  className,
}: ExperienceSectionProps): ReactElement {
  const jobs: PortfolioExperienceItem[] = portfolio.professionalExperience;

  return (
    <section
      id="experience"
      className={cn("relative py-8 sm:py-16", className)}
    >
      <div className="relative z-10 container mx-auto overflow-x-visible px-4">
        <SectionTitle>Professional Experience</SectionTitle>
        <div className="mx-auto">
          <div className={cn("relative space-y-12")}>
            {jobs.map((job: PortfolioExperienceItem) => (
              <article
                key={`${job.company}-${job.start}`}
                className="experience-entry group relative rounded-lg border border-transparent pt-4 pr-4 pl-8 sm:pl-32"
              >
                <div className="bg-border absolute top-0 bottom-0 left-0 w-0.5 sm:left-16" />
                <div className="bg-accent absolute top-8 left-0 h-4 w-4 -translate-x-1/2 transform rounded-full sm:left-16" />
                <div className="border-border bg-surface absolute top-6 left-0 h-12 w-12 overflow-hidden rounded-lg border sm:left-0 sm:h-16 sm:w-16">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BriefcaseIcon
                      size={40}
                      weight="bold"
                      className="text-subtle-foreground h-full w-full p-3"
                    />
                  )}
                </div>
                <div className="border-border bg-surface rounded-lg border p-6">
                  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-foreground text-xl font-bold">
                        {job.role}
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        {job.company}
                      </p>
                      {job.location && (
                        <p className="text-subtle-foreground text-sm">
                          {job.location}
                        </p>
                      )}
                    </div>
                    <div className="text-accent text-sm">
                      {job.start} — {job.end}
                    </div>
                  </div>
                  {job.description && (
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>
                  )}
                  {job.highlights.length > 0 && (
                    <ul className="text-muted-foreground mb-4 list-disc space-y-1 pl-5 text-sm">
                      {job.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.technologies.map((tech: string, idx: number) => (
                        <span
                          key={`${job.company}-${tech}-${idx}`}
                          className="bg-surface-raised text-muted-foreground inline-block rounded px-2 py-0.5 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-3 text-sm">
            The résumé is available as a PDF document.
          </p>
          <a
            href={portfolio.basic.resume}
            type="application/pdf"
            download
            rel="noopener noreferrer"
            aria-label="Download the résumé as a PDF document"
            title="Download the résumé as a PDF document"
            className="cta-link bg-accent hover:bg-accent-strong inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors duration-200"
          >
            Download Résumé (PDF)
            <ArrowSquareOutIcon size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
