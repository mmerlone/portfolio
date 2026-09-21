import { fireEvent, render, screen } from "@testing-library/react";
import ScrollToTop from "@/components/ScrollToTop";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: (): { replace: jest.Mock } => ({
    replace: mockReplace,
  }),
}));

describe("ScrollToTop", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 301,
    });
  });

  it("navigates to the canonical root URL when clicked", () => {
    render(<ScrollToTop />);

    fireEvent.click(screen.getByRole("button", { name: /scroll to top/i }));

    expect(mockReplace).toHaveBeenCalledWith("/", { scroll: true });
  });
});
