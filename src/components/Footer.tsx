"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import ConsentManager from "./ConsentManager";

const Footer = (): ReactElement => {
  const currentYear = new Date().getFullYear();
  const [consentManagerOpen, setConsentManagerOpen] = useState(false);

  const handleConsentManagerOpen = (): void => {
    setConsentManagerOpen(true);
  };

  const handleConsentManagerClose = (): void => {
    setConsentManagerOpen(false);
  };

  return (
    <footer className="fixed right-0 bottom-0 left-0 z-40 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <hr className="border-2 border-orange-600/10 dark:border-orange-400/10" />
      <div>
        <div className="relative z-10 container mx-auto p-2">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <small className="text-sm">
              &copy; <span>{currentYear}</span> {portfolio.basic.name}.{" "}
              {siteConfig.footer.copyright.text}
            </small>
            <div className="flex items-center gap-4">
              <Link href="/about" className="text-sm hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <a
                href="#"
                className="text-sm hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleConsentManagerOpen();
                }}
              >
                Cookie Consent
              </a>
            </div>
          </div>
        </div>
      </div>
      <ConsentManager
        open={consentManagerOpen}
        onClose={handleConsentManagerClose}
      />
    </footer>
  );
};

export default Footer;
