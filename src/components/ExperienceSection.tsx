"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { BriefcaseIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import type { PortfolioExperienceItem } from "@/types/portfolio";

interface ExperienceSectionProps {
  className?: string;
}

const INITIAL_VISIBLE = 3;

export default function ExperienceSection({
  className,
}: ExperienceSectionProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const jobs: PortfolioExperienceItem[] = portfolio.professionalExperience;

  const visibleJobs = expanded ? jobs : jobs.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="experience"
      className={cn("relative py-8 sm:py-16", className)}
    >
      <div className="relative z-10 container mx-auto overflow-x-visible px-4">
        <SectionTitle>Professional Experience</SectionTitle>
        <div className="mx-auto">
          <div
            className={cn(
              "relative space-y-12 overflow-hidden transition-all duration-500",
              expanded ? "h-auto" : "more-to-show max-h-240 overflow-x-visible",
            )}
          >
            {visibleJobs.map((job: PortfolioExperienceItem) => (
              <article
                key={`${job.company}-${job.start}`}
                className="group relative pt-4 pr-4 pl-8 sm:pl-32"
              >
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200 sm:left-16 dark:bg-gray-700" />
                <div className="absolute top-8 left-0 h-4 w-4 -translate-x-1/2 transform rounded-full bg-orange-500 sm:left-16 dark:bg-orange-400" />
                <div className="absolute top-6 left-0 h-12 w-12 overflow-hidden rounded-lg bg-white shadow-md sm:left-0 sm:h-16 sm:w-16 dark:bg-gray-800">
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
                      className="h-full w-full p-3 text-gray-400"
                    />
                  )}
                </div>
                <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] dark:bg-gray-800">
                  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {job.role}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {job.company}
                      </p>
                      {job.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {job.location}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-nowrap text-orange-600 dark:text-orange-400">
                      {job.start} — {job.end}
                    </div>
                  </div>
                  {job.description && (
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {job.description}
                    </p>
                  )}
                  {job.highlights.length > 0 && (
                    <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
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
                          className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
            {!expanded && jobs.length > INITIAL_VISIBLE && (
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent" />
            )}
          </div>
          {jobs.length > INITIAL_VISIBLE && (
            <div className="mt-4 text-center">
              <button
                onClick={(): void => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="rounded text-sm text-blue-600 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-blue-400"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
        <div className="mt-12 text-center">
          <a
            href={portfolio.basic.resume}
            type="application/pdf"
            download
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Download Resume (PDF)
            <ArrowSquareOutIcon size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
