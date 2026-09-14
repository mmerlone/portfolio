import { type ReactElement } from "react";

import { siteConfig } from "@/config/site";
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
      <p className="text-lg text-gray-600 dark:text-gray-300">{text}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-link inline-flex items-center justify-center rounded-lg bg-orange-700 px-6 py-2 text-sm font-medium text-white hover:bg-orange-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:outline-none dark:bg-orange-400 dark:text-gray-900 dark:hover:bg-orange-300 dark:focus:ring-orange-400"
      >
        {linkText}
      </a>
    </div>
  );
}
