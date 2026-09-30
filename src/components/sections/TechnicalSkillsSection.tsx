import { type ReactElement } from "react";
import { skillClusters } from "@/data/skillClusters";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechnicalSkillsSectionProps {
  className?: string;
}

export default function TechnicalSkillsSection({
  className,
}: TechnicalSkillsSectionProps): ReactElement {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative">
      <div className={"bg-muted py-16 " + (className ?? "")}>
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle id="skills-title">Technical Skills</SectionTitle>
          <div className="relative">
            <div className="mx-auto max-w-5xl space-y-6">
              {skillClusters.map((cluster, idx) => (
                <details key={idx} className="group">
                  <summary className="cursor-pointer list-none">
                    <Card className="group-open:border-primary/40">
                      <span className="flex items-center justify-between">
                        <h3 className="text-foreground text-lg font-semibold">
                          {cluster.title}
                        </h3>
                        <span className="text-primary text-sm font-medium">
                          View {cluster.skills.length} skills
                        </span>
                      </span>
                    </Card>
                  </summary>
                  <div className="mt-4 space-y-3">
                    <p className="text-muted-foreground text-sm">
                      {cluster.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.skills.map((skill, skillIdx) => (
                        <Badge
                          key={`${idx}-${skill}-${skillIdx}`}
                          variant="outline"
                          size="sm"
                        >
                          {skill}
                        </Badge>
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
