import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import HowIBuildSection from "@/components/HowIBuildSection";

describe("How I build section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<HowIBuildSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
