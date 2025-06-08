"use client";

import { useQuote, firstQuote } from "@/hooks/useQuote";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FaExternalLinkAlt } from "react-icons/fa";

const Quote = () => {
  const { data, isLoading, refetch } = useQuote({ enabled: false });
  const displayQuote = !data ? firstQuote : data;
  const { q, a } = displayQuote;

  const handleClick = async () => {
    try {
      await refetch();
    } catch (error) {
      console.warn("Error refetching quote:", error);
    }
  };

  const getQuoteSource = (a: string) => {
    switch (a) {
      case "System":
        return "some bug";
      case "Bill Gates":
        return "Popular Wisdom";
      default:
        return (
          <a
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center"
          >
            ZenQuotes API
            <FaExternalLinkAlt className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        );
    }
  };

  return (
    <div className="animated-background m-8 mx-8 max-h-fit max-w-fit flex-1 items-center rounded-lg p-3 shadow-lg outline-2 outline-gray-300 outline-solid md:flex-none dark:outline-gray-700">
      <button
        className="z-20 flex w-full cursor-pointer items-center space-x-4 rounded-lg bg-gray-50 p-4 text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] dark:bg-gray-800"
        onClick={handleClick}
      >
        {isLoading ? (
          <LoadingSpinner className="w-full" />
        ) : (
          <div className="flex-1">
            <blockquote className="text-gray-800 italic dark:text-gray-200">
              &quot;{q}&quot;
            </blockquote>
            <cite className="mt-2 block text-right text-gray-600 dark:text-gray-300">
              — {a}
            </cite>
          </div>
        )}
      </button>
      <p className="m-4 text-xs text-gray-500 dark:text-gray-400">
        Inspirational quote kindly provided by {getQuoteSource(a)}
      </p>
    </div>
  );
};

export default Quote;
