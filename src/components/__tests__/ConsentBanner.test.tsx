import { fireEvent, render, screen } from "@testing-library/react";
import ConsentBanner from "@/components/ConsentBanner";
import { deleteAllConsentCookies, getConsent, getCookie } from "@/lib/cookies";

jest.mock("@/hooks/useIsHydrated", () => ({
  useIsHydrated: (): boolean => true,
}));

const GOOGLE_COOKIES = ["_ga", "_ga_ABC123", "_gid"] as const;

const expectGoogleCookies = (present: boolean): void => {
  GOOGLE_COOKIES.forEach((name) => {
    if (present) {
      expect(getCookie(name)).toBe("1");
    } else {
      expect(getCookie(name)).toBeNull();
    }
  });
};

describe("ConsentBanner", () => {
  beforeEach(() => {
    deleteAllConsentCookies();
    GOOGLE_COOKIES.forEach((name) => {
      document.cookie = `${name}=1; path=/`;
    });
  });

  afterEach(() => {
    GOOGLE_COOKIES.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  });

  it("keeps Google cookies on Accept all", () => {
    render(<ConsentBanner />);

    fireEvent.click(screen.getByRole("button", { name: "Accept all" }));

    expect(getConsent("analytics")).toBe(true);
    expect(getConsent("marketing")).toBe(true);
    expectGoogleCookies(true);
  });

  it("removes Google cookies on Analytics only, since marketing is refused", () => {
    render(<ConsentBanner />);

    fireEvent.click(screen.getByRole("button", { name: "Analytics only" }));

    expect(getConsent("analytics")).toBe(true);
    expect(getConsent("marketing")).toBe(false);
    expectGoogleCookies(false);
  });

  it("removes Google cookies on Refuse all", () => {
    render(<ConsentBanner />);

    fireEvent.click(screen.getByRole("button", { name: "Refuse all" }));

    expect(getConsent("analytics")).toBe(false);
    expect(getConsent("marketing")).toBe(false);
    expectGoogleCookies(false);
  });
});
