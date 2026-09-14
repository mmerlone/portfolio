import { type ReactElement } from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
      className={"relative py-16 " + (className ?? "")}
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
              className="project-article flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                )}
                {project.kind === "external" ? (
                  <p className="mb-4 text-xs text-gray-600 dark:text-gray-300">
                    Publisher: {project.publisher} · Author: {project.author}
                  </p>
                ) : null}
                {project.role && (
                  <p className="mb-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                    Role: {project.role}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="m-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={`${project.name}-${tech}-${idx}`}
                        className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={getCaseStudyHref(project)}
                    className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 transition-colors hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-200"
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
                        className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                      >
                        <ArrowSquareOutIcon size={14} weight="bold" />
                        Read the article
                      </a>
                      <a
                        href={project.authorProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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
                        className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                      >
                        <ArrowSquareOutIcon size={14} weight="bold" />
                        Live demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                      >
                        <GithubLogoIcon size={14} weight="bold" />
                        GitHub
                      </a>
                      {project.npm && (
                        <a
                          href={project.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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
                          className="content-action-link inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
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
