import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";

interface ProjectsSectionProps {
  className?: string;
}

export default function ProjectsSection({
  className,
}: ProjectsSectionProps): ReactElement {
  return (
    <section id="projects" className={cn("relative py-16", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Open Source Projects</SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.openSourceProjects.map((project) => (
            <article
              key={project.name}
              className="project-article border-border bg-surface flex flex-col overflow-hidden rounded-xl border"
            >
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-foreground mb-2 text-xl font-semibold">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="text-muted-foreground mb-4 flex-1 text-sm">
                    {project.description}
                  </p>
                )}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={`${project.name}-${tech}-${idx}`}
                      className="bg-surface-raised text-muted-foreground inline-block rounded px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link text-accent hover:text-accent-strong inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    <ArrowSquareOutIcon size={14} weight="bold" />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    <GithubLogoIcon size={14} weight="bold" />
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
