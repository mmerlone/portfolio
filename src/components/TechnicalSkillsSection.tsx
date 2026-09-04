import { type ReactElement } from "react";
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
  const { technical } = portfolio.basic;

  const categories = Object.entries(technical) as [
    keyof PortfolioTechnical,
    string[],
  ][];

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div className={cn("bg-surface-muted py-16", className)}>
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle id="skills-title">Technical Skills</SectionTitle>
          <div className={cn("relative")}>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(([key, skills]) => (
                <div key={key}>
                  <h3 className="text-accent mb-2 text-sm font-semibold tracking-wide uppercase">
                    {categoryLabels[key]}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, idx) => (
                      <span
                        key={`${key}-${skill}-${idx}`}
                        className="border-border bg-surface text-muted-foreground inline-block rounded border px-2 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
