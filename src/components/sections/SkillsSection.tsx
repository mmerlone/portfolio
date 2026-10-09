import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";
import { getSkillLabels } from "@/lib/skills";
import { skillIcons } from "@/lib/skillIcons";

interface SkillsSectionProps {
  className?: string;
}

export default function SkillsSection({
  className,
}: SkillsSectionProps): ReactElement {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div className={"bg-muted py-16 " + (className ?? "")}>
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle id="skills-title">Skills</SectionTitle>
          <div className="mx-auto flex max-w-5xl flex-col gap-12">
            <section
              aria-labelledby="hard-skills-title"
              className="flex flex-col gap-6"
            >
              <h3
                id="hard-skills-title"
                className="text-foreground text-2xl font-semibold"
              >
                Hard
              </h3>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                {skills.hard.clusters.map((cluster): ReactElement => {
                  const Icon = skillIcons[cluster.icon];

                  return (
                    <li
                      key={cluster.id}
                      className="border-border flex min-w-0 items-start gap-4 border-t pt-6"
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-primary mt-1 size-5 shrink-0"
                      />
                      <div className="flex min-w-0 flex-col gap-3">
                        <h4 className="text-foreground text-lg font-semibold">
                          {cluster.title}
                        </h4>
                        <p className="text-foreground text-sm leading-relaxed">
                          {cluster.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {getSkillLabels(cluster.skills).map(
                            (skill, skillIdx) => (
                              <Badge
                                key={`${skill}-${skillIdx}`}
                                variant="outline"
                                size="sm"
                              >
                                {skill}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section
              aria-labelledby="soft-skills-title"
              className="flex flex-col gap-6"
            >
              <h3
                id="soft-skills-title"
                className="text-foreground text-2xl font-semibold"
              >
                Soft
              </h3>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
                {skills.soft.map((skill): ReactElement => {
                  const Icon = skillIcons[skill.icon];

                  return (
                    <li
                      key={skill.id}
                      id={skill.id}
                      className="border-border flex min-w-0 items-start gap-4 border-t pt-6"
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-primary mt-1 size-5 shrink-0"
                      />
                      <div className="flex min-w-0 flex-col gap-3">
                        <h4 className="text-foreground text-lg font-semibold">
                          {skill.name}
                        </h4>
                        <p className="text-foreground text-sm leading-relaxed">
                          {skill.description}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          <span className="text-foreground font-medium">
                            Evidence:{" "}
                          </span>
                          {skill.evidence}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
