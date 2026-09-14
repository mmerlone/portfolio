import { type ReactElement } from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ResumeSectionProps {
  className?: string;
}

export default function ResumeSection({
  className,
}: ResumeSectionProps): ReactElement {
  const { resume } = portfolio.basic;

  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="resume-title">Résumé</SectionTitle>
        <div className="mx-auto max-w-3xl">
          <article className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Download Résumé
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              A concise PDF summary of my professional experience, education,
              and certifications.
            </p>
            <a
              href={resume}
              type="application/pdf"
              download
              rel="noopener noreferrer"
              title="Download the résumé as a PDF document"
              className="cta-link inline-flex items-center gap-2 rounded-lg bg-orange-700 px-6 py-3 text-white transition-colors duration-200 hover:bg-orange-800 dark:bg-orange-400 dark:text-gray-900 dark:hover:bg-orange-300"
            >
              Download Résumé (PDF)
              <ArrowSquareOutIcon size={16} weight="bold" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
