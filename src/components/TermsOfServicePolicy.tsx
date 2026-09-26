"use client";

import { useEffect, useId, useRef, type FC } from "react";
import Link from "next/link";

interface TermsOfServicePolicyProps {
  visible?: boolean;
  onAccept?: () => void;
  onRefuse?: () => void;
  onAcceptAnalyticsOnly?: () => void;
  onClose?: () => void;
}

const TermsOfServicePolicy: FC<TermsOfServicePolicyProps> = ({
  visible = false,
  onAccept,
  onRefuse,
  onAcceptAnalyticsOnly,
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
        className="relative mx-4 max-h-screen w-full max-w-xl overflow-y-auto rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-600 dark:bg-gray-800"
      >
        <h2
          id={titleId}
          className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          Terms of Service & Cookie Policy
        </h2>
        <p id={descriptionId} className="mb-4 text-gray-600 dark:text-gray-300">
          I use cookies and similar technologies to enhance your browsing
          experience, analyze site traffic, and tailor marketing efforts. Choose
          which categories you consent to:
        </p>
        <div className="mb-4 space-y-3 text-gray-600 dark:text-gray-300">
          <div className="p-3 rounded border border-gray-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Analytics & Performance (Legitimate Interest)
            </h3>
            <p className="text-sm">
              Vercel Analytics & Speed Insights — aggregate, privacy-friendly
              metrics (no personal identifiers, no cross-site tracking). Processed
              under legitimate interest; you may opt out below.
            </p>
            <ul className="mt-1 ml-5 list-disc text-sm">
              <li>Page views & session counts (aggregated)</li>
              <li>Core Web Vitals & load performance</li>
              <li>Referrer & device class (no fingerprinting)</li>
            </ul>
          </div>
          <div className="p-3 rounded border border-gray-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Marketing & Measurement (Requires Consent)
            </h3>
            <p className="text-sm">
              Google Analytics / Google Tag Manager, Ahrefs Analytics — detailed
              visitor statistics, behavior tracking, and traffic attribution.
              These set cookies and process personal data (IP, identifiers).
            </p>
            <ul className="mt-1 ml-5 list-disc text-sm">
              <li>Google Analytics / GTM: user journeys, events, conversions</li>
              <li>Ahrefs Analytics: organic traffic insights (sets cookies)</li>
              <li>Interaction events (clicks, scrolls, navigation)</li>
              <li>Session & usage statistics with identifiers</li>
              <li>Device & browser information</li>
            </ul>
          </div>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Your preferences are stored as cookies in your browser. You can change
          them anytime via the{" "}
          <Link
            href="/privacy"
            className="text-orange-600 hover:underline dark:text-orange-400"
          >
            Privacy Policy
          </Link>
          {" "}or the &ldquo;Manage Consent&rdquo; link in the footer.
        </p>
        <div className="mt-4 flex flex-col space-y-2">
          <button
            type="button"
            onClick={onAccept}
            className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800 dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={onAcceptAnalyticsOnly}
            className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800 dark:bg-blue-300 dark:text-gray-900 dark:hover:bg-blue-200"
          >
            Analytics only
          </button>
          <button
            type="button"
            onClick={onRefuse}
            className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300"
          >
            Refuse all
          </button>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close terms and cookie policy"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>
    </div>
  );
};

export default TermsOfServicePolicy;