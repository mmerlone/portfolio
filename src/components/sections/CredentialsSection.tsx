import { type ReactElement } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { Award, Languages } from "lucide-react";

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
      className={"relative py-16 " + (className ?? "")}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="credentials-title">
          Languages &amp; Certifications
        </SectionTitle>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Languages */}
          <Card>
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <Languages
                size={20}
                strokeWidth={2.5}
                className="text-primary"
                aria-hidden="true"
              />
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
                  <span className="text-muted-foreground text-sm">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Certifications */}
          <Card>
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
              <Award
                size={20}
                strokeWidth={2.5}
                className="text-primary"
                aria-hidden="true"
              />
              Certifications
            </h3>
            <ul className="space-y-2">
              {portfolio.certifications.map((cert) => (
                <li
                  key={cert}
                  className="text-muted-foreground flex items-start gap-2 text-sm"
                >
                  <span
                    className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  {cert}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
