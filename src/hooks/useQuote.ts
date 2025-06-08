import { useQuery } from "@tanstack/react-query";
import { apiConfig, QUOTES_STALE_TIME } from "@/config/api";
import { useState, useEffect } from "react";
import { QuoteInterface, UseQuoteOptions } from "@/types/api";
import { errorQuote } from "@/lib/api";

export const firstQuote: QuoteInterface = {
  q: "640 k ought to be enough for anybody.",
  a: "Bill Gates",
  h: "<blockquote>&ldquo;640 k ought to be enough for anybody.&rdquo; &mdash; <footer>Bill Gates</footer></blockquote>",
};

const fetchAllQuotes = async (): Promise<QuoteInterface[]> => {
  try {
    const quotesApiUrl = apiConfig.zenquotes.url;
    const response = await fetch(quotesApiUrl);
    if (!response.ok) {
      console.warn("Network response was not ok when fetching all quotes:", response.statusText);
      return [errorQuote(response.status)];
    }
    const data: QuoteInterface[] = await response.json();
    if (data.length === 0) {
      return [firstQuote];
    }
    // Include firstQuote in the array for simpler cycling
    return [firstQuote, ...data];
  } catch (error) {
    console.warn("Failed to fetch all quotes:", error);
    return [errorQuote(500)];
  }
};

export const useQuote = (options?: UseQuoteOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: quotesArray,
    isLoading,
    isError,
  } = useQuery<QuoteInterface[], Error>({
    queryKey: ["quotesBatch"],
    queryFn: fetchAllQuotes,
    staleTime: QUOTES_STALE_TIME,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: options?.enabled,
  });

  // Reset index when quotes array changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [quotesArray]);

  const getNextQuote = () => {
    if (!quotesArray || quotesArray.length === 0) {
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesArray.length);
  };

  let displayData: QuoteInterface | undefined;
  let isLoadingDisplay = isLoading;
  let isErrorDisplay = isError;

  if (options?.enabled === false) {
    displayData = firstQuote;
    isLoadingDisplay = false;
    isErrorDisplay = false;
  } else if (isLoading) {
    displayData = undefined;
  } else if (quotesArray && quotesArray.length > 0) {
    displayData = quotesArray[currentIndex];
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
