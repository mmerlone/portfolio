import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import AboutPage from "@/app/about/page";

describe("/about page accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
