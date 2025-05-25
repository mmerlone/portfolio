"use client";

import { useEffect, useState } from "react";
import { useQuote, defaultQuote } from "@/hooks/useQuote";
import { LoadingSpinner } from "./ui/LoadingSpinner";

const Quote = () => {
  const { data, isLoading, isError, isEnabled, refetch } = useQuote();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!isEnabled || !hasMounted) return null; // Widget disabled or not mounted

  const quote = isError ? defaultQuote : data;
  const { q, a } = quote;

  const handleClick = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error refetching quote:", error);
    }
  };

  return (
    <div className="animated-background rounded-lg shadow-lg p-3 max-w-2xl mx-auto my-8">
      <button
        className="w-full text-left flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] cursor-pointer z-20"
        onClick={handleClick}
      >
        {isLoading ? (
          <LoadingSpinner className="w-full" />
        ) : (
          <div className="flex-1">
            <blockquote className="italic text-gray-600 dark:text-gray-300">
              &quot;{q}&quot;
            </blockquote>
            <cite className="mt-2 block text-right text-gray-500 dark:text-gray-400">
              — {a}
            </cite>
          </div>
        )}
      </button>
      {q && a !== defaultQuote.a && (
        <p className="text-xs m-4 text-gray-500 dark:text-gray-400">
          Inspirational quotes kindly provided by{" "}
          <a
            href="https://zenquotes.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ZenQuotes API
          </a>
        </p>
      )}
    </div>
  );
};

export default Quote;
