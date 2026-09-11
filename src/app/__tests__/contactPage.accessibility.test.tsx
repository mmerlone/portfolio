import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ContactPage from "@/app/contact/page";

describe("/contact page accessibility", () => {
  it("has no aXe violations", async () => {
    const { container } = render(<ContactPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
