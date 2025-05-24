"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import TermsOfServicePolicy from "./TermsOfServicePolicy";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer-background">
      <div className="container mx-auto p-2 relative z-10">
        <div className="flex flex-col space-y-4 mr-16">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; {currentYear} {siteConfig.name}.{" "}
              {siteConfig.footer.copyright.text}
            </p>
            {/* Terms of Service link */}
            <TermsOfServicePolicy />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
