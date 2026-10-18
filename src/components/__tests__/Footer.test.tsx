import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import FooterBase from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";

const Footer = (): ReactElement => (
  <FooterBase
    name={portfolio.basic.name}
    copyrightText={siteConfig.footer.copyright.text}
  />
);

describe("Footer", () => {
  it("links Privacy Policy to the /privacy route", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink.getAttribute("href")).toBe("/privacy");
  });

  it("opens the consent manager dialog only after the trigger is activated", () => {
    render(<Footer />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cookie Consent" }));

    expect(screen.getByRole("dialog")).not.toBeNull();
  });
});
