import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";

jest.mock("next/navigation", () => ({
  usePathname: (): string => "/",
}));

describe("Navbar accessibility", () => {
  it("has no aXe violations when the mobile menu is closed", async () => {
    const { container } = render(
      <Navbar name={portfolio.basic.name} navigation={siteConfig.navigation} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
