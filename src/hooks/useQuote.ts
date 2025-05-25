import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchQuote } from "../lib/api";
import { QuoteResponse, QuoteCache } from "@/types/api";
import { siteConfig } from "@/config/site";

// DRY: Define defaultQuote once and reuse
export const defaultQuote: QuoteResponse = siteConfig.quotes?.default || {
  q: "No quote available.",
  a: "System",
  h: "",
};

// DRY: Define quoteList based on config, fallback to defaultQuote
export const quoteList: QuoteResponse[] =
  siteConfig.quotes?.list && siteConfig.quotes.list.length > 0
    ? siteConfig.quotes.list
    : [defaultQuote];

const cacheDuration = 60 * 60 * 24 * 7; // 7 days in seconds
const quotesToCache = quoteList.length;
const cacheKey = "quotes";

// Get cached data from localStorage (or null if missing/expired)
function getCachedData(): Array<QuoteResponse> | null {
  if (typeof window === "undefined") return null;
  const storedData = localStorage.getItem(cacheKey);
  if (!storedData || storedData === "undefined") return null;
  const cachedData: QuoteCache = JSON.parse(storedData);
  const { data, timestamp } = cachedData;
  if (Date.now() - timestamp < cacheDuration * 1000) {
    return data;
  }
  clearCache();
  return null;
}

function setCachedData(data: Array<QuoteResponse>) {
  if (typeof window !== "undefined") {
    const timestamp = Date.now();
    const cachedData: QuoteCache = { data, timestamp };
    localStorage.setItem(cacheKey, JSON.stringify(cachedData));
  }
}

function addToCache(newQuote: QuoteResponse) {
  const currentCache = getCachedData() || quoteList;
  const updatedCache = [...currentCache, newQuote].slice(-quotesToCache);
  setCachedData(updatedCache);
}

function clearCache() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(cacheKey);
  }
}

export interface UseQuoteResult {
  data: QuoteResponse;
  isLoading: boolean;
  isError: boolean;
  isEnabled: boolean;
  refetch: () => Promise<void>;
}

export function useQuote(): UseQuoteResult {
  const queryClient = useQueryClient();

  // Determine if the widget is enabled (quotes config exists)
  const isEnabled = !!siteConfig.quotes;

  // Use state for the quotes stored in cache.
  const [quotes, setQuotes] = useState<QuoteResponse[]>(
    () => getCachedData() || quoteList
  );
  // Pointer to cycle through quotes when cache is full.
  const [pointer, setPointer] = useState(0);

  // Query is set to not auto-run.
  const query = useQuery<QuoteResponse, Error>({
    queryKey: ["quote"],
    queryFn: async () => {
      const result = await fetchQuote();
      return Array.isArray(result) ? result[0] : result;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  // Prefetch a quote on first mount for instant load on first click
  useEffect(() => {
    if (isEnabled) {
      queryClient.prefetchQuery({
        queryKey: ["quote"],
        queryFn: async () => {
          const result = await fetchQuote();
          return Array.isArray(result) ? result[0] : result;
        },
        staleTime: 1000 * 60 * 5,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  // When a new quote is successfully fetched, add it to cache and update state.
  useEffect(() => {
    if (query.data) {
      addToCache(query.data);
      const newQuotes = getCachedData() || quoteList;
      setQuotes(newQuotes);
      setPointer(newQuotes.length - 1);
    }
  }, [query.data]);

  const refetchHandler = async () => {
    if (quotes.length < quotesToCache) {
      await query.refetch();
    } else {
      setPointer((prev) => (prev + 1) % quotesToCache);
    }
  };

  return {
    data: quotes[pointer] || defaultQuote,
    isLoading: query.isLoading,
    isError: query.isError,
    isEnabled,
    refetch: refetchHandler,
  };
}
