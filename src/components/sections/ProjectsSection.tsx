import { type ReactElement } from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { getCaseStudyHref } from "@/lib/caseStudies";
import { GithubLogoIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";

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
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="selected-engineering-work-title">
          Selected engineering work
        </SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.openSourceProjects.map((project) => (
            <article
              id={
                project.kind === "external"
                  ? `${project.slug}-article`
                  : undefined
              }
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
                {project.kind === "external" ? (
                  <p className="text-muted-foreground mb-4 text-xs">
                    Publisher: {project.publisher} · Author: {project.author}
                  </p>
                ) : null}
                {project.role && (
                  <p className="text-muted-foreground mb-4 text-xs font-medium">
                    Role: {project.role}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="m-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={`${project.name}-${tech}-${idx}`}
                        className="bg-surface-raised text-muted-foreground inline-block rounded px-2 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={getCaseStudyHref(project)}
                    className="content-action-link text-accent hover:text-accent-strong inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    <ArrowSquareOutIcon size={14} weight="bold" />
                    View case study
                  </Link>
                  {project.kind === "external" ? (
                    <>
                      <a
                        href={project.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                      >
                        <ArrowSquareOutIcon size={14} weight="bold" />
                        Read the article
                      </a>
                      <a
                        href={project.authorProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                      >
                        <ArrowSquareOutIcon size={14} weight="bold" />
                        ArcTouch author profile
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                      >
                        <ArrowSquareOutIcon size={14} weight="bold" />
                        Live demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                      >
                        <GithubLogoIcon size={14} weight="bold" />
                        GitHub
                      </a>
                      {project.npm && (
                        <a
                          href={project.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                        >
                          <ArrowSquareOutIcon size={14} weight="bold" />
                          npm
                        </a>
                      )}
                      {project.otherLinks?.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="content-action-link text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                        >
                          <ArrowSquareOutIcon size={14} weight="bold" />
                          {link.label}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
