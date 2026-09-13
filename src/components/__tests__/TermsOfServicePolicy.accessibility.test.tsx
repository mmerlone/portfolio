import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import TermsOfServicePolicy from "@/components/TermsOfServicePolicy";

describe("TermsOfServicePolicy dialog accessibility", () => {
  it("has no aXe violations when visible", async () => {
    const { container } = render(
      <TermsOfServicePolicy
        visible
        onAccept={jest.fn()}
        onRefuse={jest.fn()}
        onClose={jest.fn()}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
