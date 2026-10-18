import { fireEvent, render, screen, within } from "@testing-library/react";
import ConsentBanner from "@/components/ConsentBanner";
import TermsOfServicePolicy from "@/components/TermsOfServicePolicy";
import { deleteAllConsentCookies, getConsent, getCookie } from "@/lib/cookies";

jest.mock("@/hooks/useIsHydrated", () => ({
  useIsHydrated: (): boolean => true,
}));

describe("TermsOfServicePolicy", () => {
  it("links the Privacy Policy mention to the /privacy route", () => {
    render(<TermsOfServicePolicy open />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink.getAttribute("href")).toBe("/privacy");
  });

  it.each([
    ["Accept all", "onAccept"],
    ["Analytics only", "onAcceptAnalyticsOnly"],
    ["Refuse all", "onRefuse"],
  ] as const)(
    "closes itself and runs %s via %s",
    (buttonLabel, callbackName) => {
      const onOpenChange = jest.fn();
      const action = jest.fn();
      const handlers = { [callbackName]: action };

      render(
        <TermsOfServicePolicy open onOpenChange={onOpenChange} {...handlers} />,
      );

      fireEvent.click(screen.getByRole("button", { name: buttonLabel }));

      // The dialog must dismiss itself. Relying on the caller to unmount it
      // would strand the modal open for any caller that keeps it mounted.
      expect(action).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    },
  );

  describe("Google cookie revocation through the banner", () => {
    beforeEach(() => {
      deleteAllConsentCookies();
      document.cookie = "_ga=1; path=/";
      document.cookie = "_ga_ABC123=1; path=/";
    });

    afterEach(() => {
      document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        "_ga_ABC123=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    });

    const choose = (buttonLabel: string): void => {
      render(<ConsentBanner />);
      fireEvent.click(
        screen.getByRole("button", {
          name: /Terms of Service & Cookie Policy/,
        }),
      );
      const dialog = screen.getByRole("dialog");
      fireEvent.click(
        within(dialog).getByRole("button", { name: buttonLabel }),
      );
    };

    it("keeps Google cookies on Accept all", () => {
      choose("Accept all");

      expect(getConsent("marketing")).toBe(true);
      expect(getCookie("_ga")).toBe("1");
      expect(getCookie("_ga_ABC123")).toBe("1");
    });

    it("removes Google cookies on Analytics only", () => {
      choose("Analytics only");

      expect(getConsent("analytics")).toBe(true);
      expect(getConsent("marketing")).toBe(false);
      expect(getCookie("_ga")).toBeNull();
      expect(getCookie("_ga_ABC123")).toBeNull();
    });

    it("removes Google cookies on Refuse all", () => {
      choose("Refuse all");

      expect(getConsent("marketing")).toBe(false);
      expect(getCookie("_ga")).toBeNull();
      expect(getCookie("_ga_ABC123")).toBeNull();
    });
  });
});
