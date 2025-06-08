"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps) {
  if (!siteConfig.cta) return null;

  const { text, linkText, link } = siteConfig.cta;

  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <p className="text-lg text-gray-700 dark:text-gray-300">{text}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-700 dark:hover:bg-orange-800"
      >
        {linkText}
      </a>
    </div>
  );
} 