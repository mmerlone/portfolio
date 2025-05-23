import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchQuote } from "../lib/api";
import { ApiQuoteData, QuoteResponse, QuoteCache } from "@/types/api";

const FirstQuote: QuoteResponse = {
  q: "640 k ought to be enough for anybody.",
  a: "Bill Gates",
  h: "",
};

const cacheDuration = 60 * 60 * 24 * 7; // 7 days in seconds
const quotesToCache = 6; // maximum quotes to cache
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
  const currentCache = getCachedData() || [FirstQuote];
  const updatedCache = [...currentCache, newQuote];
  setCachedData(updatedCache);
}

function clearCache() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(cacheKey);
  }
}

export function useQuote(): ApiQuoteData {
  // Use state for the quotes stored in cache.
  const [quotes, setQuotes] = useState<QuoteResponse[]>(
    () => getCachedData() || [FirstQuote]
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // When a new quote is successfully fetched, add it to cache and update state.
  useEffect(() => {
    if (query.data) {
      addToCache(query.data);
      const newQuotes = getCachedData() || [FirstQuote];
      setQuotes(newQuotes);
      // Set pointer to the new (last) quote.
      setPointer(newQuotes.length - 1);
    }
  }, [query.data]);

  // When refetch is requested:
  // • If the cache has fewer than quotesToCache, fetch new quote from the API.
  // • Otherwise, simply increase the pointer to cycle through cached quotes.
  const refetchHandler = async () => {
    if (quotes.length < quotesToCache) {
      await query.refetch();
    } else {
      setPointer((prev) => (prev + 1) % quotesToCache);
    }
  };

  return {
    data: quotes[pointer] || FirstQuote,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: refetchHandler,
  };
}
