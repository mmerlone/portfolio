import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("links Privacy Policy to the /privacy route", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink.getAttribute("href")).toBe("/privacy");
  });

  it("still opens the Terms of Service & Cookie Policy dialog", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", {
        name: "Terms of Service & Cookie Policy",
      }),
    ).not.toBeNull();
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
