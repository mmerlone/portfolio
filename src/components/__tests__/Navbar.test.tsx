import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn((): string => "/"),
}));

const mockedUsePathname = usePathname as jest.MockedFunction<() => string>;

describe("Navbar", () => {
  afterEach(() => {
    mockedUsePathname.mockReturnValue("/");
    // Every test here installs spies; leaving any of them in place leaks a
    // mocked `history.replaceState` or `matchMedia` into the next test.
    jest.restoreAllMocks();
  });

  it("renders a Case studies dropdown between Root and Contact", (): void => {
    render(<Navbar />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const desktopItems = Array.from(
      primaryNav.querySelectorAll(":scope > ul > li"),
    )
      .map((item) => item.querySelector(":scope > a, :scope > button"))
      .map((item) => item?.textContent ?? "")
      .map((label) => label.trim())
      .filter((label) => label.length > 0);

    expect(desktopItems).toEqual(
      expect.arrayContaining(["Root", "Case studies", "Contact", "About"]),
    );
    expect(desktopItems.indexOf("Root")).toBeLessThan(
      desktopItems.indexOf("Case studies"),
    );
    expect(desktopItems.indexOf("Case studies")).toBeLessThan(
      desktopItems.indexOf("Contact"),
    );
  });

  it("opens the Case studies dropdown with every case-study link", (): void => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /case studies/i }));

    for (const caseStudy of caseStudies) {
      expect(
        screen.getByRole("link", { name: caseStudy.name }),
      ).toHaveAttribute("href", getCaseStudyHref(caseStudy));
    }
  });

  it("renders Me link with href /", (): void => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));
    const meLink = screen.getByRole("link", { name: "Me" });
    expect(meLink).toHaveAttribute("href", "/");
  });

  it("keeps section anchors in the URL", (): void => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));

    // On the home page a section link is same-document navigation, so it uses a
    // bare fragment. That keeps the resulting URL a single `#fragment` instead
    // of concatenating onto whatever fragment is already present.
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "#selected-experience",
    );
  });

  it("never rewrites the current history entry when navigating home", (): void => {
    const replaceState = jest
      .spyOn(window.history, "replaceState")
      .mockImplementation((): void => undefined);

    try {
      render(<Navbar />);

      fireEvent.click(screen.getByRole("button", { name: /root/i }));
      fireEvent.click(screen.getByRole("link", { name: "Me" }));

      expect(replaceState).not.toHaveBeenCalled();
    } finally {
      replaceState.mockRestore();
    }
  });

  it("guards the history entry: the replaceState spy is actually installed", (): void => {
    // Without this, the assertion above could pass vacuously if spying on
    // `history.replaceState` silently failed to install.
    const originalPath = window.location.pathname;
    const replaceState = jest
      .spyOn(window.history, "replaceState")
      .mockImplementation((): void => undefined);

    try {
      window.history.replaceState(null, "", "/self-check");
      expect(replaceState).toHaveBeenCalledTimes(1);
    } finally {
      // This call does not go through the spy, so it does not affect the
      // assertion and the real URL survives for the following tests.
      window.history.replaceState(null, "", originalPath);
    }
  });

  it("exposes the home link as a plain anchor with no role override", (): void => {
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));

    // A `role="button"` on an anchor would strip its link role and break
    // link-specific assistive technology commands.
    expect(screen.getByRole("link", { name: "Me" })).not.toHaveAttribute(
      "role",
    );
  });

  it("keeps the absolute section href when not already on the home page", (): void => {
    mockedUsePathname.mockReturnValue("/about");
    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /root/i }));

    // Off the home page this is a cross-page navigation, so the absolute form
    // is required to reach the right document.
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "/#selected-experience",
    );
  });

  it("closes the mobile menu when the desktop breakpoint becomes active", (): void => {
    const listeners: EventListener[] = [];
    let matches = false;

    const addEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
    ): void => {
      if (type === "change" && typeof listener === "function") {
        listeners.push(listener);
      }
    };
    const removeEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
    ): void => {
      if (type !== "change" || typeof listener !== "function") return;
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
    const addListener = (): void => undefined;
    const removeListener = (): void => undefined;
    const dispatchEvent = (): boolean => false;

    const mediaQuery: MediaQueryList = {
      get matches(): boolean {
        return matches;
      },
      media: "",
      onchange: null,
      addEventListener,
      removeEventListener,
      addListener,
      removeListener,
      dispatchEvent,
    };
    jest.spyOn(window, "matchMedia").mockReturnValue(mediaQuery);

    const { baseElement } = render(<Navbar />);

    const dialog = baseElement.querySelector("dialog");
    expect(dialog).not.toBeNull();
    if (dialog === null) return;

    // jsdom implements no dialog methods, so stand in for them: `open` is a
    // real property, but `close` has to be supplied.
    let closeCalls = 0;
    const closeDialog = (): void => {
      closeCalls += 1;
      dialog.open = false;
    };
    dialog.close = closeDialog;
    dialog.open = true;

    expect(listeners).toHaveLength(1);

    // Narrowing back below the breakpoint must not close it.
    for (const listener of listeners) listener(new Event("change"));
    expect(closeCalls).toBe(0);
    expect(dialog.open).toBe(true);

    // The panel is `md:hidden` at this width, so hiding it is not enough: the
    // modal must actually be closed or the rest of the document stays inert.
    matches = true;
    for (const listener of listeners) listener(new Event("change"));

    expect(closeCalls).toBe(1);
    expect(dialog.open).toBe(false);
  });
});
