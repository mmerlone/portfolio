import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Navbar from "@/components/Navbar";

jest.mock("next/navigation", () => ({
  usePathname: (): string => "/",
  useRouter: (): { replace: jest.Mock } => ({
    replace: jest.fn(),
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
