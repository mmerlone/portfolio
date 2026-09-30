import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pathStages } from "@/data/pathStages";

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
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="my-path-title">My Path</SectionTitle>
        <div className="mx-auto max-w-4xl space-y-12">
          {pathStages.map((stage, idx) => (
            <Card key={idx} padding="lg">
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-foreground text-xl font-semibold">
                  {stage.title}
                </h3>
                <span className="text-primary text-sm font-medium">
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
                  <Badge key={techIdx} size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
