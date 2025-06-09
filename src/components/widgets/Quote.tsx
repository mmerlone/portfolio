"use client";

import { useQuote } from "@/hooks/useQuote";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FaExternalLinkAlt } from "react-icons/fa";
import { errorQuote } from "@/lib/api";
import { useState } from "react";

const Quote = () => {
  const [isFetchEnabled, setIsFetchEnabled] = useState(false);

  const { data, isLoading, refetch } = useQuote({ enabled: isFetchEnabled });
  
  const { q, a, s } = data || errorQuote();

  const handleClick = () => {
    setIsFetchEnabled(true);
    refetch();
  };

  const renderSource = () => {
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
          <FaExternalLinkAlt className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
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
        Inspirational quote kindly provided by {renderSource()}
      </p>
    </div>
  );
};

export default Quote;
