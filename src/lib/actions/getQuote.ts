"use server";

import { apiConfig } from "@/config/api";
import { parseQuoteResponses } from "@/lib/apiParsers";
import { type QuoteInterface } from "@/types/api";

/**
 * Server action to fetch quotes from ZenQuotes API.
 * This replaces the deprecated /api/quote endpoint.
 */
export async function getQuote(): Promise<QuoteInterface[]> {
  try {
    const response = await fetch(apiConfig.zenquotes.url, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      return [];
    }

    const payload: unknown = await response.json();
    const data = parseQuoteResponses(payload);

    if (data.length === 0) {
      return [];
    }

    // Add source metadata to each quote
    const quotes: QuoteInterface[] = data.map((quote) => ({
      q: quote.q,
      a: quote.a,
      h: quote.h,
      s: {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Inspirational quotes provided by ZenQuotes API",
      },
    }));

    return quotes;
  } catch {
    return [];
  }
}
