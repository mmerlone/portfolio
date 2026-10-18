import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";

describe("Footer section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(
      <Footer
        name={portfolio.basic.name}
        copyrightText={siteConfig.footer.copyright.text}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
