"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { setCookie } from "@/lib/cookies";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [policyOpen, setPolicyOpen] = useState(false);

  // Retrieve cookie name and expiry from site config
  const COOKIE_NAME = siteConfig.cookie.name;
  const COOKIE_EXPIRY_DAYS = siteConfig.cookie.expiryDays;

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handlePolicyOpen = () => {
    setPolicyOpen(true);
  };

  const handlePolicyClose = () => {
    setPolicyOpen(false);
  };

  const handlePolicyAccept = () => {
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
  };

  const handlePolicyRefuse = () => {
    setCookie(COOKIE_NAME, "false", COOKIE_EXPIRY_DAYS);
    setPolicyOpen(false);
  };

  return (
    <>
      <footer className="footer-background">
        <div className="container mx-auto p-2 relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; {currentYear} {siteConfig.name}.{" "}
              {siteConfig.footer.copyright.text}
            </p>
            {/* Terms of Service & Cookie Policy link */}
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                handlePolicyOpen();
              }}
            >
              Terms of Service & Cookie Policy
            </a>
          </div>
        </div>
      </footer>
      <TermsOfServicePolicy
        visible={policyOpen}
        onAccept={handlePolicyAccept}
        onRefuse={handlePolicyRefuse}
        onClose={handlePolicyClose}
      />
    </>
  );
};

export default Footer;
