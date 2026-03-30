"use client";

import { useState, type ReactElement } from "react";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { setCookie } from "@/lib/cookies";

const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();
  const [policyOpen, setPolicyOpen] = useState(false);

  // Retrieve cookie name and expiry from site config
  const COOKIE_NAME = siteConfig.cookie.name;
  const COOKIE_EXPIRY_DAYS = siteConfig.cookie.expiryDays;

  const handlePolicyOpen = (): void => {
    setPolicyOpen(true);
  };

  const handlePolicyClose = (): void => {
    setPolicyOpen(false);
  };

  const handlePolicyAccept = (): void => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
  };

  const handlePolicyRefuse = (): void => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
  };

  return (
    <footer className="text-gray-900 dark:text-gray-200">
      <hr className="border-2 border-orange-600/10 dark:border-orange-400/10" />
      <div className="shadow">
        <div className="relative z-10 container mx-auto p-2">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <small className="text-sm">
              &copy; <span>{currentYear}</span> {portfolio.basic.name}.{" "}
              {siteConfig.footer.copyright.text}
            </small>
            {/* Terms of Service & Cookie Policy link */}
            <a
              href="#"
              className="text-sm hover:underline"
              onClick={(e) => {
                e.preventDefault();
                handlePolicyOpen();
              }}
            >
              Terms of Service & Cookie Policy
            </a>
          </div>
        </div>
      </div>
      <TermsOfServicePolicy
        visible={policyOpen}
        onAccept={handlePolicyAccept}
        onRefuse={handlePolicyRefuse}
        onClose={handlePolicyClose}
      />
    </footer>
  );
};

export default Footer;
