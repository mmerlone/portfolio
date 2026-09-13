import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import TechnicalSkillsSection from "@/components/sections/TechnicalSkillsSection";

describe("TechnicalSkillsSection accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<TechnicalSkillsSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
