"use client";

import { type FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsOfServicePolicyProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAccept?: () => void;
  onRefuse?: () => void;
  onAcceptAnalyticsOnly?: () => void;
}

/**
 * The modal semantics, focus trap, Escape handling, scroll lock, backdrop
 * dismissal, and focus restoration are provided by the dialog primitive. This
 * component only decides what the policy says.
 */
const TermsOfServicePolicy: FC<TermsOfServicePolicyProps> = ({
  open = false,
  onOpenChange,
  onAccept,
  onRefuse,
  onAcceptAnalyticsOnly,
}) => {
  /**
   * Every consent action dismisses the dialog. Relying on the caller to close
   * it would leave the modal open for any caller that does not unmount it.
   */
  const chooseAndClose = (action?: () => void): void => {
    action?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service &amp; Cookie Policy</DialogTitle>
          <DialogDescription>
            I use cookies and similar technologies to enhance your browsing
            experience, analyze site traffic, and tailor marketing efforts.
            Choose which categories you consent to:
          </DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground space-y-3">
          <section className="border-border rounded-md border p-3">
            <h3 className="text-foreground mb-1 font-semibold">
              Analytics &amp; Performance (Legitimate Interest)
            </h3>
            <p className="text-sm">
              Vercel Analytics &amp; Speed Insights — aggregate,
              privacy-friendly metrics (no personal identifiers, no cross-site
              tracking). Processed under legitimate interest; you may opt out
              below.
            </p>
            <ul className="mt-1 ml-5 list-disc text-sm">
              <li>Page views &amp; session counts (aggregated)</li>
              <li>Core Web Vitals &amp; load performance</li>
              <li>Referrer &amp; device class (no fingerprinting)</li>
            </ul>
          </section>
          <section className="border-border rounded-md border p-3">
            <h3 className="text-foreground mb-1 font-semibold">
              Marketing &amp; Measurement (Requires Consent)
            </h3>
            <p className="text-sm">
              Google Analytics / Google Tag Manager, Ahrefs Analytics — detailed
              visitor statistics, behavior tracking, and traffic attribution.
              These set cookies and process personal data (IP, identifiers).
            </p>
            <ul className="mt-1 ml-5 list-disc text-sm">
              <li>
                Google Analytics / GTM: user journeys, events, conversions
              </li>
              <li>Ahrefs Analytics: organic traffic insights (sets cookies)</li>
              <li>Interaction events (clicks, scrolls, navigation)</li>
              <li>Session &amp; usage statistics with identifiers</li>
              <li>Device &amp; browser information</li>
            </ul>
          </section>
        </div>

        <p className="text-muted-foreground">
          Your preferences are stored as cookies in your browser. You can change
          them anytime via the{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          or the &ldquo;Manage Consent&rdquo; link in the footer.
        </p>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            className="w-full"
            onClick={() => {
              chooseAndClose(onAccept);
            }}
          >
            Accept all
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              chooseAndClose(onAcceptAnalyticsOnly);
            }}
          >
            Analytics only
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              chooseAndClose(onRefuse);
            }}
          >
            Refuse all
          </Button>
        </DialogFooter>

        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4"
              aria-label="Close terms and cookie policy"
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServicePolicy;
