/**
 * @jest-environment node
 */
import { GET } from "@/app/index.md/route";
import { renderPortfolioMarkdown } from "@/lib/renderPortfolioMarkdown";

describe("/index.md route", () => {
  it("always serves the rendered Markdown with the correct Content-Type", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(body).toBe(renderPortfolioMarkdown());
  });
});
