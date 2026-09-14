import { type ReactElement } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
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
            <article
              key={idx}
              className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {stage.title}
                </h3>
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  {stage.period}
                </span>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {stage.description}
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
                {stage.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {stage.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="inline-block rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
