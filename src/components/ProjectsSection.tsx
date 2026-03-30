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
            <div
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                )}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={`${project.name}-${tech}-${idx}`}
                      className="inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
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
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 transition-colors hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    <ArrowSquareOutIcon size={14} weight="bold" />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <GithubLogoIcon size={14} weight="bold" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
