import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("links Privacy Policy to the /privacy route", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink.getAttribute("href")).toBe("/privacy");
  });

  it("opens the consent manager dialog only after the trigger is activated", () => {
    render(<Footer />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cookie Consent" }));

    expect(screen.getByRole("dialog")).not.toBeNull();
  });
});
