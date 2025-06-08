"use client";

import { useState, useEffect } from "react";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { setCookie, getCookie } from "@/lib/cookies";
import { siteConfig } from "@/config/site";

const TermsOfServiceToast = () => {
  const [visible, setVisible] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  // Retrieve cookie name and expiry from site config
  const COOKIE_NAME = siteConfig.cookie.name;
  const COOKIE_EXPIRY_DAYS = siteConfig.cookie.expiryDays;

  useEffect(() => {
    const accepted = getCookie(COOKIE_NAME);
    if (!accepted) {
      setVisible(true);
    }
  }, [COOKIE_NAME]);

  // Handler for the toast's Accept button.
  const handleAccept = () => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setVisible(false);
  };

  // Handler for the toast's Refuse button.
  const handleRefuse = () => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setVisible(false);
    // Optionally, add logic here to disable tracking.
  };

  // Handlers for the policy modal.
  const handlePolicyAccept = () => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
    setVisible(false);
  };

  const handlePolicyRefuse = () => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
    setVisible(false);
    // Optionally, add logic here to disable tracking.
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed right-4 bottom-4 left-4 z-50 flex flex-col items-center justify-between rounded bg-gray-200 p-4 text-gray-800 shadow-lg md:flex-row dark:bg-gray-800 dark:text-white shadow-gray-950">
        <p className="mx-4 mb-2 text-sm md:mb-0">
          I use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept</strong> or <strong>Refuse</strong> you agree
          to my{" "}
          <button
            onClick={() => setPolicyOpen(true)}
            className="bg-gray-200 underline hover:text-gray-300 focus:outline-none dark:bg-gray-800"
          >
            Terms of Service & Cookie Policy
          </button>
          .
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={handleRefuse}
            className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Refuse
          </button>
        </div>
      </div>
      <TermsOfServicePolicy
        visible={policyOpen}
        onAccept={handlePolicyAccept}
        onRefuse={handlePolicyRefuse}
        onClose={() => setPolicyOpen(false)}
      />
    </>
  );
};

export default TermsOfServiceToast;
