"use client";

import { useEffect, useId, useRef, type FC } from "react";

interface TermsOfServicePolicyProps {
  visible?: boolean;
  onAccept?: () => void;
  onRefuse?: () => void;
  onClose?: () => void;
}

const TermsOfServicePolicy: FC<TermsOfServicePolicyProps> = ({
  visible = false,
  onAccept,
  onRefuse,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!visible) return;

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;

      if (
        previouslyFocused instanceof HTMLElement &&
        document.contains(previouslyFocused)
      ) {
        previouslyFocused.focus();
      }
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80"
      onClick={(event): void => {
        if (event.target === event.currentTarget) closeRef.current?.();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="border-border-strong bg-surface relative mx-4 max-h-screen w-full max-w-xl overflow-y-auto rounded-lg border p-6"
      >
        <h2 id={titleId} className="text-foreground mb-4 text-2xl font-bold">
          Terms of Service & Cookie Policy
        </h2>
        <p id={descriptionId} className="text-muted-foreground mb-4">
          I use cookies to enhance your browsing experience, analyze site
          traffic, and tailor my marketing efforts. The following data is
          collected:
        </p>
        <ul className="text-muted-foreground mb-4 ml-5 list-disc">
          <li>Google Analytics for visitor statistics</li>
          <li>Google Tag Manager for managing tracking scripts</li>
          <li>Vercel Analytics for performance monitoring</li>
          <li>Interaction events (clicks, scrolls, and navigation)</li>
          <li>Session and usage statistics</li>
          <li>Device and browser information</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          By accepting, you agree to our data usage in accordance with this
          policy. Your consent is stored as a cookie in your browser so that we
          don’t ask again.
        </p>
        <p className="text-muted-foreground mb-4">
          For more details, please review the full Privacy Policy on my website.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onAccept}
            className="bg-consent-accept text-consent-action-foreground hover:bg-consent-accept-hover rounded px-4 py-2 text-sm"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onRefuse}
            className="bg-consent-refuse text-consent-action-foreground hover:bg-consent-refuse-hover rounded px-4 py-2 text-sm"
          >
            Refuse
          </button>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close terms and cookie policy"
          className="text-subtle-foreground hover:text-foreground absolute top-2 right-2"
        >
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>
    </div>
  );
};

export default TermsOfServicePolicy;
