import { type ReactElement } from "react";
import {
  ArrowSquareOutIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

interface ResumeContactSectionProps {
  className?: string;
}

export default function ResumeContactSection({
  className,
}: ResumeContactSectionProps): ReactElement {
  const { resume, contact, social } = portfolio.basic;

  return (
    <section
      id="resume-contact"
      aria-labelledby="resume-contact-title"
      className={cn("relative py-16", className)}
    >
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle id="resume-contact-title">Résumé & Contact</SectionTitle>
        <div className="mx-auto max-w-3xl space-y-8">
          <article className="border-border bg-surface rounded-lg border p-8">
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
              className="cta-link bg-action text-action-foreground hover:bg-action-hover inline-flex items-center gap-2 rounded-lg px-6 py-3 transition-colors duration-200"
            >
              Download Résumé (PDF)
              <ArrowSquareOutIcon size={16} weight="bold" aria-hidden="true" />
            </a>
          </article>

          <article className="border-border bg-surface rounded-lg border p-8">
            <h3 className="text-foreground mb-4 text-xl font-semibold">
              Get in Touch
            </h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m open to discussing senior engineering roles, architecture
              consulting, and speaking opportunities.
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
              >
                <EnvelopeSimpleIcon
                  size={20}
                  weight="bold"
                  aria-hidden="true"
                />
                <span>{contact.email}</span>
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
              >
                <LinkedinLogoIcon size={20} weight="bold" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              {social?.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
