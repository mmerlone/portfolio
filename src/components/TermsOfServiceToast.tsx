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
      <div className="border-border-strong bg-surface-raised text-foreground fixed right-4 bottom-4 left-4 z-50 flex flex-col items-center justify-between rounded border p-4 md:flex-row">
        <p className="mx-4 mb-2 text-sm md:mb-0">
          I use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept</strong> or <strong>Refuse</strong> you agree
          to my{" "}
          <button
            type="button"
            onClick={() => {
              setPolicyOpen(true);
            }}
            className="bg-surface-raised underline decoration-1 hover:decoration-2 focus:outline-none"
          >
            Terms of Service & Cookie Policy
          </button>
          .
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="bg-consent-accept text-consent-action-foreground hover:bg-consent-accept-hover rounded px-4 py-2 text-sm"
          >
            Accept
          </button>
          <button
            onClick={handleRefuse}
            className="bg-consent-refuse text-consent-action-foreground hover:bg-consent-refuse-hover rounded px-4 py-2 text-sm"
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
