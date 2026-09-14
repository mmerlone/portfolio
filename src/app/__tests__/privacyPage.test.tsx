import { render, screen } from "@testing-library/react";
import PrivacyPage, { metadata } from "@/app/privacy/page";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";

describe("/privacy page", () => {
  it("has a route-specific canonical URL in metadata", () => {
    expect(metadata.alternates).toEqual(
      expect.objectContaining({ canonical: "/privacy" }),
    );
    expect(metadata.title).toBe(`Privacy Policy — ${portfolio.basic.name}`);
  });

  it("renders a single h1 and organized h2 sections", () => {
    render(<PrivacyPage />);

    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe("Privacy Policy");

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.map((h) => h.textContent)).toEqual([
      "Who Controls This Data",
      "What We Collect",
      "Retention",
      "Your Choices",
      "Contact",
    ]);
  });

  it("discloses every configured analytics processor and the consent cookie", () => {
    render(<PrivacyPage />);

    expect(screen.getAllByText(/Google Analytics/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Google Tag Manager/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ahrefs Analytics/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vercel Analytics/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vercel Speed Insights/).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/Cloudflare/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/the CDN\/WAF in front of this site/)).toBeNull();
    expect(screen.getByText(new RegExp(siteConfig.cookie.name))).not.toBeNull();
  });

  it("links the site's public contact email without rendering any secret values", () => {
    render(<PrivacyPage />);

    const mailLinks = screen.getAllByRole("link", {
      name: new RegExp(portfolio.basic.contact.email),
    });
    expect(mailLinks.length).toBeGreaterThan(0);
    for (const link of mailLinks) {
      expect(link.getAttribute("href")).toBe(
        `mailto:${portfolio.basic.contact.email}`,
      );
    }

    const secretEnvValues = [
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY,
    ].filter((value): value is string => Boolean(value));

    for (const value of secretEnvValues) {
      expect(document.body.textContent).not.toContain(value);
    }
  });
});
