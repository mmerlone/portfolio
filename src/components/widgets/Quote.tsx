"use client";

import {
  startTransition,
  use,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { errorQuote } from "@/lib/api";
import type { QuoteInterface } from "@/types/api";

export interface QuoteProps {
  quotesPromise: Promise<QuoteInterface[]>;
}

const Quote = ({ quotesPromise }: QuoteProps): ReactElement => {
  const [isFetchEnabled, setIsFetchEnabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialQuote: QuoteInterface = {
    q: "640 k ought to be enough for anybody.",
    a: "Bill Gates",
    h: "\u003cblockquote\u003e\u0026ldquo;640 k ought to be enough for anybody.\u0026rdquo; \u0026mdash; \u003cfooter\u003eBill Gates\u003c/footer\u003e\u003c/blockquote\u003e",
    s: {
      anchor: "Popular Wisdom",
      title: "A famous quote often attributed to Bill Gates",
    },
  };
  const fetchedQuotes = isFetchEnabled ? use(quotesPromise) : null;
  const quotes = fetchedQuotes ?? [initialQuote];
  const activeQuote = quotes[currentIndex] ?? errorQuote(500);

  const { q, a, s } = activeQuote;

  const handleClick = (): void => {
    if (!isFetchEnabled) {
      startTransition(() => {
        setIsFetchEnabled(true);
      });
      return;
    }

    setCurrentIndex((previousIndex) => (previousIndex + 1) % quotes.length);
  };

  const renderSource = (): ReactNode => {
    if (s?.href) {
      return (
        <a
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center"
          title={s?.title}
        >
          {s.anchor}
          <ArrowSquareOutIcon
            size={12}
            weight="bold"
            className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
          />
        </a>
      );
    }
    if (s?.title) {
      return <span title={s.title}>{s.anchor}</span>;
    }
    return s.anchor;
  };

  return (
    <div className="animated-background m-8 mx-8 max-h-fit max-w-fit flex-1 items-center rounded-lg p-3 shadow-lg outline-2 outline-gray-300 outline-solid md:flex-none dark:outline-gray-700">
      <button
        className="z-20 flex w-full cursor-pointer items-center space-x-4 rounded-lg bg-gray-50 p-4 text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] dark:bg-gray-800"
        onClick={handleClick}
      >
        <div className="flex-1">
          <blockquote className="text-gray-800 italic dark:text-gray-200">
            &quot;{q}&quot;
          </blockquote>
          <cite className="mt-2 block text-right text-gray-600 dark:text-gray-300">
            — {a}
          </cite>
        </div>
      </button>
      <p className="m-4 text-xs text-gray-500 dark:text-gray-400">
        Inspirational quote kindly provided by {renderSource()}
      </p>
    </div>
  );
};

export const QuoteFallback = (): ReactElement => {
  return (
    <div className="animated-background m-8 mx-8 max-h-fit max-w-fit flex-1 items-center rounded-lg p-3 shadow-lg outline-2 outline-gray-300 outline-solid md:flex-none dark:outline-gray-700">
      <div className="z-20 flex w-full items-center space-x-4 rounded-lg bg-gray-50 p-4 text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] dark:bg-gray-800">
        <LoadingSpinner className="w-full" />
      </div>
      <p className="m-4 text-xs text-gray-500 dark:text-gray-400">
        Loading a fresh quote...
      </p>
    </div>
  );
};

export default Quote;
