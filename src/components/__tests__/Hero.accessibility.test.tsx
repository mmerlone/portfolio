import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Hero from "@/components/Hero";

describe("Hero section accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<Hero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
