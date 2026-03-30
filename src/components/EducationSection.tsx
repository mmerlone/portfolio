import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { GraduationCapIcon } from "@phosphor-icons/react/ssr";

interface EducationSectionProps {
  className?: string;
}

export default function EducationSection({
  className,
}: EducationSectionProps): ReactElement {
  return (
    <section id="education" className={cn("relative py-16", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Education</SectionTitle>
        <div className="mx-auto max-w-3xl space-y-6">
          {portfolio.education.map((entry) => (
            <div
              key={`${entry.institution}-${entry.years}`}
              className="flex gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                <GraduationCapIcon size={20} weight="bold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {entry.program}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {entry.institution}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {entry.years}
                </p>
                {entry.notes && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {entry.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
