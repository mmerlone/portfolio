import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import UnderTheHoodPage from "@/app/under-the-hood/page";

describe("Under the Hood page accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<UnderTheHoodPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
