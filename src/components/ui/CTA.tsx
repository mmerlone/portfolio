import { type ReactElement } from "react";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

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
      className={`flex flex-col items-center gap-2 text-center ${className}`}
    >
      <p className="text-muted-foreground text-lg">{text}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: "lg" })}
      >
        {linkText}
      </a>
    </div>
  );
}
