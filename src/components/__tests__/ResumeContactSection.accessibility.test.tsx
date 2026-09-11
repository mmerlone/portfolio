import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ResumeContactSection from "@/components/ResumeContactSection";

describe("Resume and contact section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<ResumeContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
