"use client";

import { useState, type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import type { PortfolioTechnical } from "@/types/portfolio";

interface TechnicalSkillsSectionProps {
  className?: string;
}

const categoryLabels: Record<keyof PortfolioTechnical, string> = {
  programming: "Programming & Frameworks",
  operatingSystems: "Operating Systems",
  hardware: "Hardware & Infrastructure",
  serversAndServices: "Servers & Services",
  databases: "Databases",
  platformsAndTools: "Platforms & Tools",
  virtualization: "Virtualization",
  networkingAndSecurity: "Networking & Security",
  backupAndRecovery: "Backup & Recovery",
  cloud: "Cloud",
  automation: "Automation",
  other: "Other",
};

export default function TechnicalSkillsSection({
  className,
}: TechnicalSkillsSectionProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const { technical } = portfolio.basic;

  const categories = Object.entries(technical) as [
    keyof PortfolioTechnical,
    string[],
  ][];
  const visibleCategories = expanded ? categories : categories.slice(0, 6);

  return (
    <section id="skills" className="relative">
      <div className={cn("bg-gray-100 py-16 dark:bg-gray-950", className)}>
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle>Technical Skills</SectionTitle>
          <div className={cn("relative")}>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCategories.map(([key, skills]) => (
                <div key={key}>
                  <h3 className="mb-2 text-sm font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400">
                    {categoryLabels[key]}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, idx) => (
                      <span
                        key={`${key}-${skill}-${idx}`}
                        className="inline-block rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={(): void => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="rounded text-sm text-blue-600 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-blue-400"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
