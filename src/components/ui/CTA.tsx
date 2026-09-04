import { type ReactElement } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps): ReactElement | null {
  if (!siteConfig.cta) {
    return null;
  }

  const { text, linkText, link } = siteConfig.cta;

  return (
    <div
      className={cn("flex flex-col items-center gap-2 text-center", className)}
    >
      <p className="text-muted-foreground text-lg">{text}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-link bg-action text-action-foreground hover:bg-action-hover focus:ring-accent inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        {linkText}
      </a>
    </div>
  );
}
