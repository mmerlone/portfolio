"use client";

import { useEffect, useRef, useState, type FC } from "react";
import Link from "next/link";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { COOKIE_CHANGE_EVENT, getConsent, hasExplicitConsentDecision, setConsent } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

interface ConsentManagerProps {
  open?: boolean;
  onClose?: () => void;
}

const ConsentManager: FC<ConsentManagerProps> = ({ open = false, onClose }) => {
  const isClient = useIsHydrated();
  const [analyticsConsent, setAnalyticsConsent] = useState<"granted" | "refused" | "unknown">("unknown");
  const [marketingConsent, setMarketingConsent] = useState<"granted" | "refused" | "unknown">("unknown");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const ANALYTICS_EXPIRY_DAYS = siteConfig.cookie.analytics.expiryDays;
  const MARKETING_EXPIRY_DAYS = siteConfig.cookie.marketing.expiryDays;

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isClient) return;

    const updateConsentState = (): void => {
      const analyticsGranted = getConsent("analytics");
      const analyticsDecided = hasExplicitConsentDecision("analytics");
      const marketingGranted = getConsent("marketing");
      const marketingDecided = hasExplicitConsentDecision("marketing");

      setAnalyticsConsent(
        analyticsGranted ? "granted" : analyticsDecided ? "refused" : "unknown",
      );
      setMarketingConsent(
        marketingGranted ? "granted" : marketingDecided ? "refused" : "unknown",
      );
    };

    updateConsentState();
    window.addEventListener(COOKIE_CHANGE_EVENT, updateConsentState);
    return (): void => {
      window.removeEventListener(COOKIE_CHANGE_EVENT, updateConsentState);
    };
  }, [isClient]);

  useEffect(() => {
    if (!open || !isClient) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;
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
        previouslyFocusedRef.current instanceof HTMLElement &&
        document.contains(previouslyFocusedRef.current)
      ) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [open, isClient]);

  const handleAcceptAll = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", true, MARKETING_EXPIRY_DAYS);
    onClose?.();
  };

  const handleAnalyticsOnly = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    onClose?.();
  };

  const handleRefuseAll = (): void => {
    setConsent("analytics", false, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    onClose?.();
  };

  if (!isClient || !open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80"
      onClick={(event): void => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="relative mx-4 max-h-screen w-full max-w-xl overflow-y-auto rounded-lg border border-gray-300 bg-white p-6 dark:border-gray-600 dark:bg-gray-800"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Manage Consent Preferences
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Choose which categories you consent to. Your preferences are stored as
          cookies in your browser and can be changed at any time.
        </p>
        <div className="mb-4 space-y-3 text-gray-600 dark:text-gray-300">
          <div className="p-3 rounded border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Analytics & Performance (Legitimate Interest)
                </h3>
                <p className="text-sm">
                  Vercel Analytics & Speed Insights — aggregate, privacy-friendly
                  metrics (no personal identifiers, no cross-site tracking).
                  Processed under legitimate interest; you may opt out below.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    analyticsConsent === "granted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : analyticsConsent === "refused"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {analyticsConsent === "granted"
                    ? "Granted"
                    : analyticsConsent === "refused"
                      ? "Refused"
                      : "Not set"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Marketing & Measurement (Requires Consent)
                </h3>
                <p className="text-sm">
                  Google Analytics / Google Tag Manager, Ahrefs Analytics — detailed
                  visitor statistics, behavior tracking, and traffic attribution.
                  These set cookies and process personal data (IP, identifiers).
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    marketingConsent === "granted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : marketingConsent === "refused"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {marketingConsent === "granted"
                    ? "Granted"
                    : marketingConsent === "refused"
                      ? "Refused"
                      : "Not set"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          For more details, see the{" "}
          <Link
            href="/privacy"
            className="text-orange-600 hover:underline dark:text-orange-400"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col space-y-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800 dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={handleAnalyticsOnly}
            className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800 dark:bg-blue-300 dark:text-gray-900 dark:hover:bg-blue-200"
          >
            Analytics only
          </button>
          <button
            type="button"
            onClick={handleRefuseAll}
            className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300"
          >
            Refuse all
          </button>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close consent manager"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <span aria-hidden="true">&#10005;</span>
        </button>
      </div>
    </div>
  );
};

export default ConsentManager;