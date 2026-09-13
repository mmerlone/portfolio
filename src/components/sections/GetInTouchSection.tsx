import { type ReactElement } from "react";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { getSocialIcon } from "@/lib/getSocialIcon";
import { cn } from "@/lib/cn";

interface GetInTouchSectionProps {
  className?: string;
  /** Heading level for "Get in Touch"; must match the surrounding document outline. */
  headingLevel?: "h2" | "h3";
}

export default function GetInTouchSection({
  className,
  headingLevel: HeadingTag = "h2",
}: GetInTouchSectionProps): ReactElement {
  const { contact, social, location } = portfolio.basic;

  return (
    <article
      className={cn(
        "get-in-touch border-border bg-surface rounded-lg border p-8",
        className,
      )}
    >
      <HeadingTag className="text-foreground mb-4 text-xl font-semibold">
        Get in Touch
      </HeadingTag>
      <p className="text-muted-foreground mb-6">
        I&apos;m open to discussing senior engineering roles, architecture
        consulting, and speaking opportunities.
      </p>
      <div className="space-y-4">
        <a
          href={`mailto:${contact.email}`}
          className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
        >
          <EnvelopeSimpleIcon size={20} weight="bold" aria-hidden="true" />
          <span>{contact.email}</span>
        </a>
        {social?.map((link) => {
          const Icon = getSocialIcon(link.name);

          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
            >
              <Icon size={20} weight="bold" aria-hidden="true" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          );
        })}
        <p className="text-muted-foreground flex items-center gap-3">
          <MapPinIcon size={20} weight="bold" aria-hidden="true" />
          <span>{location}</span>
        </p>
      </div>
    </article>
  );
}
