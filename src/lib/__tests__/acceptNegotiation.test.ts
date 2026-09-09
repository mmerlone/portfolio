import { negotiateHomepageRepresentation } from "@/lib/acceptNegotiation";

describe("negotiateHomepageRepresentation", () => {
  it.each([
    [null, "html"],
    ["", "html"],
    ["   ", "html"],
    ["text/html", "html"],
    ["text/markdown", "markdown"],
    ["text/html;q=0.5, text/markdown;q=0.5", "html"],
    ["text/html;q=0.5, text/markdown;q=0.9", "markdown"],
    ["text/markdown;q=0.9, text/html;q=0.5", "markdown"],
    ["text/html;q=0.9, text/markdown;q=0.5", "html"],
    ["text/*", "html"],
    ["*/*", "html"],
    ["text/markdown;q=0, text/html;q=0", "not-acceptable"],
    ["application/pdf", "not-acceptable"],
    ["application/pdf;q=1.0", "not-acceptable"],
    ["text/markdown;q=0, */*;q=0", "not-acceptable"],
    ["text/markdown;q=0, */*", "html"],
    [",,,", "html"],
    ["not-a-media-range", "html"],
    ["text/html;q=abc", "html"],
    ["text/html;q=2", "html"],
    ["text/html, text/markdown;q=0.8", "html"],
    [" text/markdown ; q=1 ", "markdown"],
  ] as const)("negotiates %s -> %s", (acceptHeader, expected) => {
    expect(negotiateHomepageRepresentation(acceptHeader)).toBe(expected);
  });
});
