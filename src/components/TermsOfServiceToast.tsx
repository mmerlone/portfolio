"use client";

import { useState, type ReactElement } from "react";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import {
  setConsent,
  hasExplicitConsentDecision,
  deleteAnalyticsCookies,
} from "@/lib/cookies";
import { siteConfig } from "@/config/site";

const TermsOfServiceToast = (): ReactElement | null => {
  const isClient = useIsHydrated();
  const [closed, setClosed] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const ANALYTICS_EXPIRY_DAYS = siteConfig.cookie.analytics.expiryDays;
  const MARKETING_EXPIRY_DAYS = siteConfig.cookie.marketing.expiryDays;

  const handleAcceptAll = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", true, MARKETING_EXPIRY_DAYS);
    setClosed(true);
  };

  const handleRefuseAll = (): void => {
    setConsent("analytics", false, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    deleteAnalyticsCookies();
    setClosed(true);
  };

  const handleAnalyticsOnly = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    setClosed(true);
  };

  if (!isClient) {
    return null;
  }

  const analyticsDecided = hasExplicitConsentDecision("analytics");
  const marketingDecided = hasExplicitConsentDecision("marketing");
  const hasExplicitDecision = analyticsDecided || marketingDecided;

  if (hasExplicitDecision || closed) {
    return null;
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 left-4 z-50 flex flex-col items-center justify-between rounded border border-gray-300 bg-gray-200 p-4 text-gray-900 md:flex-row dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
        <p className="mx-4 mb-2 text-sm md:mb-0">
          I use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept all</strong> you agree to my{" "}
          <button
            type="button"
            onClick={() => {
              setPolicyOpen(true);
            }}
            className="bg-gray-200 underline decoration-1 hover:decoration-2 focus:outline-none dark:bg-gray-700"
          >
            Terms of Service & Cookie Policy
          </button>
          .
        </p>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <button
            onClick={handleAcceptAll}
            className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800 dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200 whitespace-nowrap"
          >
            Accept all
          </button>
          <button
            onClick={handleAnalyticsOnly}
            className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800 dark:bg-blue-300 dark:text-gray-900 dark:hover:bg-blue-200 whitespace-nowrap"
          >
            Analytics only
          </button>
          <button
            onClick={handleRefuseAll}
            className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300 whitespace-nowrap"
          >
            Refuse all
          </button>
        </div>
      </div>
      <TermsOfServicePolicy
        visible={policyOpen}
        onAccept={handleAcceptAll}
        onRefuse={handleRefuseAll}
        onAcceptAnalyticsOnly={handleAnalyticsOnly}
        onClose={() => {
          setPolicyOpen(false);
        }}
      />
    </>
  );
};

export default TermsOfServiceToast;