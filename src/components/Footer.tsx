"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import ConsentManager from "./ConsentManager";

interface FooterProps {
  readonly name: string;
  readonly copyrightText: string;
}

const Footer = ({ name, copyrightText }: FooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();
  const [consentManagerOpen, setConsentManagerOpen] = useState(false);

  return (
    <footer className="bg-background text-foreground fixed right-0 bottom-0 left-0 z-40">
      <Separator className="bg-primary/10" />
      <div className="relative z-10 container mx-auto p-2">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <small>
            &copy; <span>{currentYear}</span> {name}. {copyrightText}
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
            <button
              type="button"
              className="text-sm hover:underline"
              onClick={(): void => {
                setConsentManagerOpen(true);
              }}
            >
              Cookie Consent
            </button>
          </div>
        </div>
      </div>
      <ConsentManager
        open={consentManagerOpen}
        onOpenChange={setConsentManagerOpen}
      />
    </footer>
  );
};

export default Footer;
