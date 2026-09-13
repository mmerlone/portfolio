import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import PrivacyPage from "@/app/privacy/page";

describe("/privacy page accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<PrivacyPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
