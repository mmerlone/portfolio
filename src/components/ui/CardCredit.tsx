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
      className={cn(
        "group flex transform items-center justify-center space-x-4 transition-all duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex items-center rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="p-4">
          <a href={credit.url} target="_blank" rel="noopener noreferrer">
            <div className="relative h-24 w-24 rounded-md bg-white p-8 shadow">
              <Image
                src={getIconSrc(credit.icon)}
                alt={credit.name}
                fill
                sizes="96px"
                className="rounded-md object-contain p-2"
              />
            </div>
          </a>
        </div>
        <div className="flex w-full flex-col p-4">
          <a
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left"
          >
            <h3 className="flex gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              {credit.name}
              <ArrowSquareOutIcon
                size={12}
                weight="bold"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </h3>
            <p className="w-50 text-xs text-gray-600 sm:w-80 sm:text-sm dark:text-gray-300">
              {credit.description}
            </p>
          </a>
        </div>
      </div>
    </article>
  );
};
