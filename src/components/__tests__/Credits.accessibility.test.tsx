import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Credits from "@/components/Credits";

describe("Credits section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<Credits />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
