import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Footer from "@/components/Footer";

describe("Footer section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
