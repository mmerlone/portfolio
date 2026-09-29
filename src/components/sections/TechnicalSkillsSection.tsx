import { type ReactElement } from "react";
import { skillClusters } from "@/data/skillClusters";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface TechnicalSkillsSectionProps {
  className?: string;
}

export default function TechnicalSkillsSection({
  className,
}: TechnicalSkillsSectionProps): ReactElement {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div
        className={"bg-gray-100 py-16 dark:bg-gray-950 " + (className ?? "")}
      >
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle id="skills-title">Technical Skills</SectionTitle>
          <div className="relative">
            <div className="mx-auto max-w-5xl space-y-6">
              {skillClusters.map((cluster, idx) => (
                <details
                  key={idx}
                  className="group rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between select-none">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {cluster.title}
                    </h3>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      View {cluster.skills.length} skills
                    </span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {cluster.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.skills.map((skill, skillIdx) => (
                        <span
                          key={`${idx}-${skill}-${skillIdx}`}
                          className="inline-block rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
