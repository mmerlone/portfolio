"use client";

import { useState, useEffect } from "react";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { setCookie, getCookie } from "@/lib/cookies";

const COOKIE_NAME = "portfolioTosAccepted";
const COOKIE_EXPIRY_DAYS = 365;

const TermsOfServiceToast = () => {
  const [visible, setVisible] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    const accepted = getCookie(COOKIE_NAME);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

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
      <div className="fixed bottom-4 left-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg flex flex-col md:flex-row justify-between items-center z-50">
        <p className="text-sm mb-2 md:mb-0">
          We use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept</strong> or <strong>Refuse</strong> you agree
          to our{" "}
          <button
            onClick={() => setPolicyOpen(true)}
            className="underline hover:text-gray-300 focus:outline-none"
          >
            Terms of Service & Cookie Policy
          </button>
          .
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white text-sm"
          >
            Accept
          </button>
          <button
            onClick={handleRefuse}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
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
