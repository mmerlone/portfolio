import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { portfolio } from "@/data/portfolio";

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

  it("renders hero with updated role and point of view", () => {
    render(<Home />);

    expect(screen.getByText(portfolio.basic.name)).toBeInTheDocument();
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText(
        "I build software with a systems engineer's perspective.",
      ),
    ).toBeInTheDocument();
  });

  it("renders three proof links in hero", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("link", { name: "Selected engineering work" }),
    ).toHaveAttribute("href", "#selected-engineering-work");
    expect(
      screen.getByRole("link", { name: "Cirrus migration article" }),
    ).toHaveAttribute("href", "#headless-cms-migration-article");
    expect(screen.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "href",
      "#resume",
    );
    expect(
      container.querySelector("#headless-cms-migration-article"),
    ).not.toBeNull();
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

  it("renders the approved homepage section order with correct headings", () => {
    render(<Home />);

    const h2s = screen.getAllByRole("heading", { level: 2 });
    const headingTexts = h2s.map((h) => h.textContent);

    expect(headingTexts).toEqual([
      "Senior Software Engineer",
      "Selected engineering work",
      "How I build",
      "My Path",
      "Selected experience",
      "Technical Skills",
      "Résumé",
    ]);
    expect(screen.queryByText("Portfolio Credits")).not.toBeInTheDocument();
  });
});
