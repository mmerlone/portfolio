import { type ReactElement } from "react";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

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
          <Card padding="lg">
            <h3 className="text-foreground mb-4 text-xl font-semibold">
              Download Résumé
            </h3>
            <p className="text-muted-foreground mb-6">
              A concise PDF summary of my professional experience, education,
              and certifications.
            </p>
            <a
              href={resume}
              type="application/pdf"
              download
              rel="noopener noreferrer"
              title="Download the résumé as a PDF document"
              className={buttonVariants({ size: "lg" })}
            >
              Download Résumé (PDF)
              <ExternalLink size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}
