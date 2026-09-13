import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";
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

class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn((): IntersectionObserverEntry[] => []);
}

describe("Navbar", () => {
  beforeAll(() => {
    window.IntersectionObserver = IntersectionObserverMock;
  });

  it("renders a Case studies dropdown between Root and Contact", () => {
    const { container } = render(<Navbar />);

    const desktopItems = Array.from(
      container.querySelectorAll("nav > div > div > ul > li"),
    )
      .map((item) => item.querySelector(":scope > a, :scope > button"))
      .map((item) => item?.textContent)
      .filter((label): label is string => Boolean(label));

    expect(desktopItems).toEqual(
      expect.arrayContaining(["Root", "Case studies", "Contact"]),
    );
    expect(desktopItems.indexOf("Root")).toBeLessThan(
      desktopItems.indexOf("Case studies"),
    );
    expect(desktopItems.indexOf("Case studies")).toBeLessThan(
      desktopItems.indexOf("Contact"),
    );
  });

  it("opens the Case studies dropdown with every case-study link", () => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /case studies/i }));

    for (const caseStudy of caseStudies) {
      expect(
        screen.getByRole("link", { name: caseStudy.name }),
      ).toHaveAttribute("href", getCaseStudyHref(caseStudy));
    }
  });
});
