import { render } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/lib/widgetData", () => ({
  getGitHubRepoStatsWidgetData: (): Promise<{
    stats: null;
    errorMessage: string;
  }> => Promise.resolve({ stats: null, errorMessage: "mocked" }),
}));

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

describe("homepage heading outline and content", () => {
  it("renders exactly one non-empty h1", () => {
    const { container } = render(<Home />);

    const h1s = Array.from(container.querySelectorAll("h1")).filter(
      (heading) => normalizeText(heading.textContent).length > 0,
    );

    expect(h1s).toHaveLength(1);
  });

  it("renders at least 500 normalized characters of meaningful content", () => {
    const { container } = render(<Home />);

    const text = normalizeText(container.textContent);
    expect(text.length).toBeGreaterThanOrEqual(500);
  });

  it("never skips a heading level going deeper into the document", () => {
    const { container } = render(<Home />);

    const headings = Array.from(
      container.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    );

    let previousLevel = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName.slice(1));
      expect(level).toBeLessThanOrEqual(previousLevel + 1);
      previousLevel = level;
    }
  });
});
