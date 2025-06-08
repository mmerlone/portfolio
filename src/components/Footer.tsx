"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { setCookie } from "@/lib/cookies";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";
import { EffectsEnum, BackgroundEffectsEnum } from "@/types/effects";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
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
    <footer className="text-gray-900 dark:text-gray-200">
      <BackgroundEffects
        backgrounds={{
          [EffectsEnum.OFF]: BackgroundEffectsEnum.FOOTER,
          [EffectsEnum.EXPERIMENTAL]: BackgroundEffectsEnum.FOOTER,
        }}
        className="shadow"
      >
        <div className="relative z-10 container mx-auto p-2">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm">
              &copy; {currentYear} {siteConfig.name}.{" "}
              {siteConfig.footer.copyright.text}
            </p>
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
      </BackgroundEffects>
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
