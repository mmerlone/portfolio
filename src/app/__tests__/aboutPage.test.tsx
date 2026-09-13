import { render, screen } from "@testing-library/react";
import AboutPage, { metadata } from "@/app/about/page";
import { portfolio } from "@/data/portfolio";

describe("/about page", () => {
  it("has a route-specific canonical URL in metadata", () => {
    expect(metadata.alternates).toEqual(
      expect.objectContaining({ canonical: "/about" }),
    );
    expect(metadata.title).toBe(`About — ${portfolio.basic.name}`);
  });

  it("renders a single h1 and a sequential heading outline", () => {
    render(<AboutPage />);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe(`About ${portfolio.basic.name}`);

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.map((h) => h.textContent)).toEqual([
      "Background",
      "Areas of Expertise",
      "Location",
      "Portfolio Credits",
    ]);
  });

  it("renders substantive content sourced from shared portfolio data", () => {
    render(<AboutPage />);

    expect(screen.getByText(portfolio.basic.summary)).not.toBeNull();
    expect(
      screen.getByText(new RegExp(portfolio.basic.location)),
    ).not.toBeNull();
    for (const area of portfolio.basic.expertise) {
      expect(screen.getByText(new RegExp(area.name))).not.toBeNull();
    }
  });

  it("renders Credits section with carousel", () => {
    render(<AboutPage />);

    expect(screen.getByText("Portfolio Credits")).toBeInTheDocument();
    expect(
      screen.getByText((content: string) =>
        content.includes(
          "This portfolio acknowledges the companies and technologies that support it",
        ),
      ),
    ).toBeInTheDocument();
  });
});
