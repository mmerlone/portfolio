import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Navbar from "@/components/Navbar";
import { ThemeEnum } from "@/types/theme";

const setTheme = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: (): string => "/",
}));

jest.mock("next-themes", () => ({
  useTheme: (): { theme: string; setTheme: typeof setTheme } => ({
    theme: ThemeEnum.SYSTEM,
    setTheme,
  }),
}));

// jsdom does not implement IntersectionObserver; provide a minimal mock
// for the section active-link observer Navbar wires up in a useEffect.
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn((): IntersectionObserverEntry[] => []);
}

describe("Navbar accessibility", () => {
  beforeAll(() => {
    window.IntersectionObserver = IntersectionObserverMock;
  });

  it("has no aXe violations when the mobile menu is closed", async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
