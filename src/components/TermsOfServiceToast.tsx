"use client";

import { useState, type ReactElement } from "react";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { setCookie, getCookie } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

const TermsOfServiceToast = (): ReactElement | null => {
  const isClient = useIsHydrated();
  const [closed, setClosed] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  // Retrieve cookie name and expiry from site config
  const COOKIE_NAME = siteConfig.cookie.name;
  const COOKIE_EXPIRY_DAYS = siteConfig.cookie.expiryDays;

  // Handler for the toast's Accept button.
  const handleAccept = (): void => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setClosed(true);
  };

  // Handler for the toast's Refuse button.
  const handleRefuse = (): void => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setClosed(true);
    // Optionally, add logic here to disable tracking.
  };

  // Handlers for the policy modal.
  const handlePolicyAccept = (): void => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
    setClosed(true);
  };

  const handlePolicyRefuse = (): void => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
    setClosed(true);
    // Optionally, add logic here to disable tracking.
  };

  if (!isClient) {
    return null;
  }

  const accepted = getCookie(COOKIE_NAME);
  if (accepted || closed) {
    return null;
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 left-4 z-50 flex flex-col items-center justify-between rounded border border-gray-300 bg-gray-200 p-4 text-gray-900 md:flex-row dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
        <p className="mx-4 mb-2 text-sm md:mb-0">
          I use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept</strong> or <strong>Refuse</strong> you agree
          to my{" "}
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
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="rounded bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800 dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200"
          >
            Accept
          </button>
          <button
            onClick={handleRefuse}
            className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300"
          >
            Refuse
          </button>
        </div>
      </div>
      <TermsOfServicePolicy
        visible={policyOpen}
        onAccept={handlePolicyAccept}
        onRefuse={handlePolicyRefuse}
        onClose={() => {
          setPolicyOpen(false);
        }}
      />
    </>
  );
};

export default TermsOfServiceToast;
