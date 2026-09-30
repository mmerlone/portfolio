import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { sectionCopy } from "@/data/sections";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectArticleCard } from "@/components/ui/ProjectArticleCard";

interface ProjectsSectionProps {
  className?: string;
}

export default function ProjectsSection({
  className,
}: ProjectsSectionProps): ReactElement {
  return (
    <section
      id="selected-engineering-work"
      aria-labelledby="selected-engineering-work-title"
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="selected-engineering-work-title">
          Selected engineering work
        </SectionTitle>
        {sectionCopy.projects.introParagraphs.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground mb-8">
            {paragraph}
          </p>
        ))}

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.openSourceProjects.map((project) => (
            <ProjectArticleCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
