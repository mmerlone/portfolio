import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ResumeSection from "@/components/sections/ResumeSection";

describe("Resume section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<ResumeSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
