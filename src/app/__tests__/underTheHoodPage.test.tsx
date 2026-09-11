import { render, screen } from "@testing-library/react";
import UnderTheHoodPage, { metadata } from "@/app/under-the-hood/page";

describe("/under-the-hood page", () => {
  it("has route-specific metadata", () => {
    expect(metadata.alternates).toEqual(
      expect.objectContaining({ canonical: "/under-the-hood" }),
    );
    expect(metadata.title).toBe("Under the Hood — Marcio Merlone");
  });

  it("renders verified status vocabulary without invented audit scores", () => {
    render(<UnderTheHoodPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Under the Hood",
    );
    expect(screen.getByText("Browser security headers")).toBeInTheDocument();
    expect(screen.getByText("Automated accessibility")).toBeInTheDocument();
    expect(screen.getAllByText("External result pending")).toHaveLength(3);
    expect(screen.queryByText(/Lighthouse 100/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/WCAG 2\.1 AA Compliant/),
    ).not.toBeInTheDocument();
  });

  it("links to the provider matrix and repository evidence", () => {
    render(<UnderTheHoodPage />);

    expect(
      screen.getByRole("link", { name: "Open the provider authority matrix" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mmerlone/portfolio/blob/main/PROVIDER-AUTHORITY-MATRIX.md",
    );
    expect(
      screen.getByRole("link", { name: "CI workflow source" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/mmerlone/portfolio/blob/main/.github/workflows/ci.yml",
    );
  });
});
