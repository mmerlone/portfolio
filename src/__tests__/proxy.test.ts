/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { proxy, config } from "@/proxy";

function makeRequest(url: string, accept?: string): NextRequest {
  return new NextRequest(url, {
    headers: accept !== undefined ? { Accept: accept } : undefined,
  });
}

describe("proxy", () => {
  describe.each([
    [undefined, "html"],
    ["text/html", "html"],
    ["text/markdown", "markdown"],
    ["text/html;q=0.5, text/markdown;q=0.5", "html"],
    ["text/markdown;q=0.9, text/html;q=0.5", "markdown"],
    ["text/html;q=0.9, text/markdown;q=0.5", "html"],
    ["text/*", "html"],
    ["*/*", "html"],
    [",,,", "html"],
    ["not-a-media-range", "html"],
  ] as const)("Accept: %s", (accept, expected) => {
    it(`resolves to ${expected}`, () => {
      const response = proxy(makeRequest("https://mmerlone.dev.br/", accept));

      if (expected === "markdown") {
        expect(response.headers.get("x-middleware-rewrite")).toBe(
          "https://mmerlone.dev.br/index.md",
        );
      } else {
        expect(response.headers.get("x-middleware-next")).toBe("1");
      }
      expect(response.headers.get("Vary")).toBe("Accept");
    });
  });

  it("returns 406 when neither text/html nor text/markdown is acceptable", () => {
    const response = proxy(
      makeRequest("https://mmerlone.dev.br/", "application/pdf"),
    );

    expect(response.status).toBe(406);
    expect(response.headers.get("Vary")).toBe("Accept");
  });

  it("returns 406 when both representations are explicitly rejected", () => {
    const response = proxy(
      makeRequest(
        "https://mmerlone.dev.br/",
        "text/html;q=0, text/markdown;q=0",
      ),
    );

    expect(response.status).toBe(406);
  });

  it("preserves query strings when rewriting to /index.md", () => {
    const response = proxy(
      makeRequest("https://mmerlone.dev.br/?foo=bar", "text/markdown"),
    );

    expect(response.headers.get("x-middleware-rewrite")).toBe(
      "https://mmerlone.dev.br/index.md?foo=bar",
    );
  });

  describe("matcher", () => {
    it("matches the homepage", () => {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          url: "https://mmerlone.dev.br/",
        }),
      ).toBe(true);
    });

    it.each([
      "/index.md",
      "/robots.txt",
      "/sitemap.xml",
      "/_next/static/chunk.js",
      "/_vercel/insights/script.js",
      "/images/profile/profile.png",
      "/about",
    ])("excludes %s", (path) => {
      expect(
        unstable_doesMiddlewareMatch({
          config,
          url: `https://mmerlone.dev.br${path}`,
        }),
      ).toBe(false);
    });
  });
});
