"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

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
          <div className="flex justify-between items-center">
            <p>
              &copy; {currentYear} {siteConfig.name}.{" "}
              {siteConfig.footer.copyright.text}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
