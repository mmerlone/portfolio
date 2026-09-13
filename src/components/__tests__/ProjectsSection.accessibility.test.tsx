import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ProjectsSection from "@/components/sections/ProjectsSection";

describe("ProjectsSection accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<ProjectsSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
