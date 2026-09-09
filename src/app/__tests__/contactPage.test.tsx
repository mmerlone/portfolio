import { render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "@/app/contact/page";
import { portfolio } from "@/data/portfolio";

describe("/contact page", () => {
  it("has a route-specific canonical URL in metadata", () => {
    expect(metadata.alternates).toEqual(
      expect.objectContaining({ canonical: "/contact" }),
    );
    expect(metadata.title).toBe(`Contact — ${portfolio.basic.name}`);
  });

  it("renders a single h1 and a sequential heading outline", () => {
    render(<ContactPage />);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe(`Contact ${portfolio.basic.name}`);

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.map((h) => h.textContent)).toEqual([
      "Email",
      "Social Links",
      "Location",
    ]);
  });

  it("renders a working mailto link and the configured social links", () => {
    render(<ContactPage />);

    const mailLink = screen.getByRole("link", {
      name: new RegExp(portfolio.basic.contact.email),
    });
    expect(mailLink.getAttribute("href")).toBe(
      `mailto:${portfolio.basic.contact.email}`,
    );

    for (const social of portfolio.basic.social ?? []) {
      const link = screen.getByRole("link", { name: social.name });
      expect(link.getAttribute("href")).toBe(social.url);
    }
  });
});
