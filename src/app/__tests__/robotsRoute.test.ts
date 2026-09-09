/**
 * @jest-environment node
 */
import { GET } from "@/app/robots.txt/route";
import { siteConfig } from "@/config/site";

describe("robots.txt route", () => {
  it("allows crawling and AI use, and advertises the canonical sitemap", async () => {
    const response = GET();
    const body: string = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(body).toBe(
      [
        "User-agent: *",
        "Content-Signal: search=yes,ai-input=yes,ai-train=yes,use=full",
        "Allow: /",
        "",
        `Sitemap: ${siteConfig.url}/sitemap.xml`,
        "",
      ].join("\n"),
    );
  });
});
