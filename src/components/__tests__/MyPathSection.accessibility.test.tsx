import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import MyPathSection from "@/components/MyPathSection";

describe("My path section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<MyPathSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
