import { type ReactElement } from "react";
import { Mail, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { getSocialIcon } from "@/lib/getSocialIcon";
import { Card } from "@/components/ui/card";

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

  const itemClass =
    "flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary";

  return (
    <Card padding="lg" className={className}>
      <HeadingTag className="text-foreground mb-4 text-xl font-semibold">
        Get in Touch
      </HeadingTag>
      <p className="text-muted-foreground mb-6">
        I&apos;m open to discussing senior engineering roles, architecture
        consulting, and speaking opportunities.
      </p>
      <div className="space-y-4">
        <a href={`mailto:${contact.email}`} className={itemClass}>
          <Mail size={20} strokeWidth={2.5} aria-hidden="true" />
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
              className={itemClass}
            >
              <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          );
        })}
        <p className={itemClass}>
          <MapPin size={20} strokeWidth={2.5} aria-hidden="true" />
          <span>{location}</span>
        </p>
      </div>
    </Card>
  );
}
