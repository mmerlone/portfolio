import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import EducationSection from "@/components/EducationSection";

describe("EducationSection accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<EducationSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
