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
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="credentials-title">
          Languages &amp; Certifications
        </SectionTitle>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Languages */}
          <article className="border-border bg-surface rounded-xl border p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <TranslateIcon size={20} weight="bold" className="text-accent" />
              Languages
            </h3>
            <ul className="space-y-3">
              {portfolio.languages.map((lang) => (
                <li
                  key={lang.language}
                  className="flex items-center justify-between"
                >
                  <span className="text-foreground font-medium">
                    {lang.language}
                  </span>
                  <span className="text-subtle-foreground text-sm">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Certifications */}
          <article className="border-border bg-surface rounded-xl border p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <CertificateIcon
                size={20}
                weight="bold"
                className="text-accent"
              />
              Certifications
            </h3>
            <ul className="space-y-2">
              {portfolio.certifications.map((cert) => (
                <li
                  key={cert}
                  className="text-muted-foreground flex items-start gap-2 text-sm"
                >
                  <span className="bg-accent mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
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
