import { fireEvent, render, screen } from "@testing-library/react";
import ScrollToTop from "@/components/ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 301,
    });
  });

  it("renders and scrolls to top when clicked", () => {
    const mockScrollTo = jest.fn();
    window.scrollTo = mockScrollTo;

    render(<ScrollToTop />);

    fireEvent.click(screen.getByRole("button", { name: /scroll to top/i }));

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
