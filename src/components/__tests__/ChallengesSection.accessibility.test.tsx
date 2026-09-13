import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ChallengesSection from "@/components/sections/ChallengesSection";

describe("ChallengesSection accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<ChallengesSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
