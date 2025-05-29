"use client";

import { useEffect, useState } from "react"; // Correct import path
import { useQuote, defaultQuote } from "@/hooks/useQuote";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

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
    <section>
      <div className="animated-background mx-auto my-8 max-w-2xl rounded-lg p-3 shadow-lg outline-2 outline-gray-300 outline-solid dark:outline-gray-700">
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
        {q && a !== defaultQuote.a && (
          <p className="m-4 text-xs text-gray-500 dark:text-gray-400">
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
    </section>
  );
};

export default Quote;
