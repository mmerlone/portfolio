import { fireEvent, render, screen } from "@testing-library/react";
import ConsentManager from "@/components/ConsentManager";
import {
  getConsent,
  deleteAllConsentCookies,
  hasExplicitConsentDecision,
} from "@/lib/cookies";

jest.mock("@/hooks/useIsHydrated", () => ({
  useIsHydrated: (): boolean => true,
}));

const getSwitch = (category: "analytics" | "marketing"): HTMLElement => {
  const name =
    category === "analytics"
      ? "Analytics & Performance (Legitimate Interest)"
      : "Marketing & Measurement (Requires Consent)";

  return screen.getByRole("switch", { name });
};

describe("ConsentManager", () => {
  beforeEach(() => {
    deleteAllConsentCookies();
  });

  it("exposes a switch per category, named by its heading", () => {
    render(<ConsentManager open />);

    const analytics = getSwitch("analytics");
    const marketing = getSwitch("marketing");

    // Base UI renders a focusable span with `role="switch"`, not a button, so
    // the role and the accessible name are what matter here.
    expect(analytics.tagName).toBe("SPAN");
    expect(analytics).toHaveAttribute("tabindex", "0");
    expect(analytics.getAttribute("aria-checked")).toBe("false");
    expect(marketing.getAttribute("aria-checked")).toBe("false");
  });

  it("toggles only the category that was activated", () => {
    render(<ConsentManager open />);

    fireEvent.click(getSwitch("marketing"));

    expect(getSwitch("marketing").getAttribute("aria-checked")).toBe("true");
    expect(getSwitch("analytics").getAttribute("aria-checked")).toBe("false");
  });

  it("does not write cookies until preferences are saved", () => {
    render(<ConsentManager open />);

    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(getSwitch("marketing"));

    expect(getConsent("analytics")).toBe(false);
    expect(getConsent("marketing")).toBe(false);
  });

  it("saves the switched categories and closes the dialog", () => {
    const onOpenChange = jest.fn();
    render(<ConsentManager open onOpenChange={onOpenChange} />);

    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    expect(getConsent("analytics")).toBe(true);
    expect(getConsent("marketing")).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("grants every category when both switches are on", () => {
    const onOpenChange = jest.fn();
    render(<ConsentManager open onOpenChange={onOpenChange} />);

    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(getSwitch("marketing"));
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    expect(getConsent("analytics")).toBe(true);
    expect(getConsent("marketing")).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("declines every category when both switches are off", () => {
    const onOpenChange = jest.fn();
    render(<ConsentManager open onOpenChange={onOpenChange} />);

    // Toggle each switch on and back off, so saving is not a no-op that
    // merely re-confirms the "unknown" state.
    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(getSwitch("marketing"));
    fireEvent.click(getSwitch("marketing"));
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    expect(getConsent("analytics")).toBe(false);
    expect(getConsent("marketing")).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("records an explicit refusal, not an undecided state, on save", () => {
    const onOpenChange = jest.fn();
    render(<ConsentManager open onOpenChange={onOpenChange} />);

    // Untouched switches must still write a decision, so reopening the dialog
    // cannot be mistaken for a first visit.
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    expect(hasExplicitConsentDecision("analytics")).toBe(true);
    expect(hasExplicitConsentDecision("marketing")).toBe(true);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("reflects an existing stored decision in the switch state", () => {
    const { unmount } = render(<ConsentManager open />);
    fireEvent.click(getSwitch("analytics"));
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
    unmount();

    render(<ConsentManager open />);

    expect(getSwitch("analytics").getAttribute("aria-checked")).toBe("true");
    expect(getSwitch("marketing").getAttribute("aria-checked")).toBe("false");
  });
});
