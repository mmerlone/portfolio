import { useQuery } from "@tanstack/react-query";
import { QUOTES_STALE_TIME } from "@/config/api";
import { useState, useEffect } from "react";
import { QuoteInterface, UseQuoteOptions } from "@/types/api";
import { errorQuote } from "@/lib/api";
import { siteConfig } from "@/config/site";

const fetchAllQuotes = async (): Promise<QuoteInterface[]> => {
  try {
    const response = await fetch("/api/quote");
    if (!response.ok) {
      console.warn(
        "Network response was not ok when fetching all quotes:",
        response.statusText,
      );
      return [errorQuote(response.status)];
    }
    const data: QuoteInterface[] = await response.json();
    if (data.length === 0) {
      return [errorQuote(404)];
    }
    data.forEach((quote) => {
      quote.s = {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Inspirational quotes provided by ZenQuotes API. API",
      };
    });
    return [...data];
  } catch (error) {
    console.warn("Failed to fetch all quotes:", error);
    return [errorQuote(500)];
  }
};

export const useQuote = (options?: UseQuoteOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const firstQuote = siteConfig.quote?.firstQuote;
  const [quotes, setQuotes] = useState<QuoteInterface[]>(() =>
    siteConfig.quote?.firstQuote ? [siteConfig.quote.firstQuote] : [],
  );

  const {
    data: apiQuotes,
    isLoading,
    isError,
  } = useQuery<QuoteInterface[], Error>({
    queryKey: ["quotesBatch"],
    queryFn: fetchAllQuotes,
    staleTime: QUOTES_STALE_TIME,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: options?.enabled && firstQuote ? true : false,
  });

  // Update quotes when apiQuotes changes
  useEffect(() => {
    if (apiQuotes && apiQuotes.length > 0) {
      setQuotes(apiQuotes);
    }
  }, [apiQuotes]);

  const getNextQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  let displayData: QuoteInterface | undefined;
  let isLoadingDisplay = isLoading;
  let isErrorDisplay = isError;

  if (options?.enabled === false) {
    displayData = siteConfig.quote?.firstQuote;
    isLoadingDisplay = false;
    isErrorDisplay = false;
  } else if (isLoading) {
    displayData = quotes[currentIndex];
  } else if (quotes.length > 0) {
    displayData = quotes[currentIndex];
  } else {
    displayData = errorQuote(500);
    isErrorDisplay = true;
  }

  return {
    data: displayData,
    isLoading: isLoadingDisplay,
    isError: isErrorDisplay,
    refetch: getNextQuote,
  };
};
