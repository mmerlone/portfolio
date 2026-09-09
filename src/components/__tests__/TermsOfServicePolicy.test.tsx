import { render, screen } from "@testing-library/react";
import TermsOfServicePolicy from "@/components/TermsOfServicePolicy";

describe("TermsOfServicePolicy", () => {
  it("links the Privacy Policy mention to the /privacy route", () => {
    render(<TermsOfServicePolicy visible />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink.getAttribute("href")).toBe("/privacy");
  });
});
