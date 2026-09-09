import { renderPortfolioMarkdown } from "@/lib/renderPortfolioMarkdown";

// Explicit, fixed URL: always serves Markdown regardless of the Accept header.
export function GET(): Response {
  return new Response(renderPortfolioMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
