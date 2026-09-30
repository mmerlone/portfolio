import { fireEvent, render, screen } from "@testing-library/react";
import TermsOfServicePolicy from "@/components/TermsOfServicePolicy";

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
});
