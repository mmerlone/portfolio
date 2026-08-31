import Image from "next/image";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { type FC } from "react";
import { cn } from "@/lib/cn";

// Helper function to build the proper icon URL
const getIconSrc = (icon: string): string => {
  if (/^https?:\/\//i.test(icon)) {
    return icon;
  }
  // Otherwise assume it's a relative path under /images/icons/
  return `/images/icons/${icon}`;
};

interface CardCreditProps {
  credit: {
    name: string;
    description: string;
    url: string;
    icon: string;
  };
  className?: string;
}

export const CardCredit: FC<CardCreditProps> = ({ credit, className = "" }) => {
  return (
    <article
      className={cn("flex items-center justify-center space-x-4", className)}
    >
      <a
        href={credit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-border bg-surface flex items-center rounded-lg border"
      >
        <div className="p-4">
          <div className="border-border relative h-24 w-24 rounded-md border bg-white p-8">
            <Image
              src={getIconSrc(credit.icon)}
              alt={credit.name}
              fill
              sizes="96px"
              className="rounded-md object-contain p-2"
            />
          </div>
        </div>
        <div className="flex w-full flex-col p-4">
          <div className="text-left">
            <h3 className="text-foreground flex gap-2 text-lg font-semibold">
              {credit.name}
              <ArrowSquareOutIcon size={12} weight="bold" aria-hidden="true" />
            </h3>
            <p className="text-muted-foreground w-50 text-xs sm:w-80 sm:text-sm">
              {credit.description}
            </p>
          </div>
        </div>
      </a>
    </article>
  );
};
