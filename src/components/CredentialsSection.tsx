import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";
import { CertificateIcon, TranslateIcon } from "@phosphor-icons/react/ssr";

interface CredentialsSectionProps {
  className?: string;
}

export default function CredentialsSection({
  className,
}: CredentialsSectionProps): ReactElement {
  return (
    <section id="credentials" className={cn("relative py-16", className)}>
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle>Languages &amp; Certifications</SectionTitle>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Languages */}
          <article className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <TranslateIcon
                size={20}
                weight="bold"
                className="text-orange-600 dark:text-orange-400"
              />
              Languages
            </h3>
            <ul className="space-y-3">
              {portfolio.languages.map((lang) => (
                <li
                  key={lang.language}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {lang.language}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Certifications */}
          <article className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <CertificateIcon
                size={20}
                weight="bold"
                className="text-orange-600 dark:text-orange-400"
              />
              Certifications
            </h3>
            <ul className="space-y-2">
              {portfolio.certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  {cert}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
