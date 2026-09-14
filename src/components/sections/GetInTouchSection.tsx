import { type ReactElement } from "react";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { portfolio } from "@/data/portfolio";
import { getSocialIcon } from "@/lib/getSocialIcon";

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
      className={
        "rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800 " +
        (className ?? "")
      }
    >
      <HeadingTag className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Get in Touch
      </HeadingTag>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        I&apos;m open to discussing senior engineering roles, architecture
        consulting, and speaking opportunities.
      </p>
      <div className="space-y-4">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
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
              className="flex items-center gap-3 text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400"
            >
              <Icon size={20} weight="bold" aria-hidden="true" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          );
        })}
        <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <MapPinIcon size={20} weight="bold" aria-hidden="true" />
          <span>{location}</span>
        </p>
      </div>
    </article>
  );
}
