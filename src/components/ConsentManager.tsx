"use client";

import { useEffect, useState, type FC } from "react";
import Link from "next/link";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import {
  COOKIE_CHANGE_EVENT,
  deleteAnalyticsCookies,
  getConsent,
  hasExplicitConsentDecision,
  setConsent,
} from "@/lib/cookies";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConsentState = "granted" | "refused" | "unknown";

interface ConsentManagerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ConsentCategory {
  readonly id: "analytics" | "marketing";
  readonly title: string;
  readonly description: string;
  readonly detail: readonly string[];
}

const CONSENT_CATEGORIES: readonly ConsentCategory[] = [
  {
    id: "analytics",
    title: "Analytics & Performance (Legitimate Interest)",
    description:
      "Vercel Analytics & Speed Insights — aggregate, privacy-friendly metrics (no personal identifiers, no cross-site tracking). Processed under legitimate interest.",
    detail: [
      "Page views & session counts (aggregated)",
      "Core Web Vitals & load performance",
      "Referrer & device class (no fingerprinting)",
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Measurement (Requires Consent)",
    description:
      "Google Analytics / Google Tag Manager, Ahrefs Analytics — detailed visitor statistics, behavior tracking, and traffic attribution. These set cookies and process personal data (IP, identifiers).",
    detail: [
      "Google Analytics / GTM: user journeys, events, conversions",
      "Ahrefs Analytics: organic traffic insights (sets cookies)",
      "Interaction events (clicks, scrolls, navigation)",
      "Session & usage statistics with identifiers",
      "Device & browser information",
    ],
  },
];

const readState = (category: "analytics" | "marketing"): ConsentState => {
  if (getConsent(category)) return "granted";
  if (hasExplicitConsentDecision(category)) return "refused";
  return "unknown";
};

/**
 * Per-category consent switches committed by a single explicit save. This
 * replaced three action buttons (accept all / accept analytics only / refuse
 * all), which each wrote a decision immediately and closed the dialog, so a
 * visitor could not review or change one category without setting all of them.
 * Every category is now a switch and "Save preferences" is the only action.
 */
const ConsentManager: FC<ConsentManagerProps> = ({
  open = false,
  onOpenChange,
}) => {
  const isClient = useIsHydrated();
  const [states, setStates] = useState<Record<string, ConsentState>>({
    analytics: "unknown",
    marketing: "unknown",
  });

  useEffect(() => {
    if (!isClient) return;

    const updateConsentState = (): void => {
      setStates({
        analytics: readState("analytics"),
        marketing: readState("marketing"),
      });
    };

    // Re-read on every open, so a stored decision is always reflected when the
    // dialog appears. Gating the read on `!open` made the switches render
    // unset whenever the component was mounted already-open.
    updateConsentState();

    // Cookie changes are only tracked while the dialog is closed, otherwise
    // saving would reset the switches mid-edit.
    if (!open) {
      window.addEventListener(COOKIE_CHANGE_EVENT, updateConsentState);
      return (): void => {
        window.removeEventListener(COOKIE_CHANGE_EVENT, updateConsentState);
      };
    }
    return undefined;
  }, [isClient, open]);

  if (!isClient) {
    return null;
  }

  const savePreferences = (): void => {
    setConsent(
      "analytics",
      states.analytics === "granted",
      siteConfig.cookie.analytics.expiryDays,
    );
    setConsent(
      "marketing",
      states.marketing === "granted",
      siteConfig.cookie.marketing.expiryDays,
    );
    if (states.analytics !== "granted" || states.marketing !== "granted") {
      deleteAnalyticsCookies();
    }
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Consent Preferences</DialogTitle>
          <DialogDescription>
            Choose which categories you consent to. Your preferences are stored
            as cookies in your browser and can be changed at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground space-y-3">
          {CONSENT_CATEGORIES.map((category) => {
            const state = states[category.id] ?? "unknown";
            const titleId = `${category.id}-consent-title`;

            return (
              <section
                key={category.id}
                className="border-border flex flex-col justify-between gap-3 rounded-md border p-3"
              >
                <div className="flex w-full flex-row items-start justify-between gap-2">
                  <h3
                    id={titleId}
                    className="text-foreground mb-1 font-semibold"
                  >
                    {category.title}
                  </h3>
                  <Switch
                    size="sm"
                    checked={state === "granted"}
                    aria-labelledby={titleId}
                    onCheckedChange={(checked): void => {
                      setStates((current) => ({
                        ...current,
                        [category.id]: checked ? "granted" : "refused",
                      }));
                    }}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <p className="basis-1/3 text-xs">{category.description}</p>
                  <ul className="mt-1 ml-5 basis-2/3 list-disc text-xs">
                    {category.detail.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <p className="text-muted-foreground text-xs">
          For more details, see the{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <DialogFooter>
          <Button className="w-full" onClick={savePreferences}>
            Save preferences
          </Button>
        </DialogFooter>

        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4"
              aria-label="Close consent manager"
            />
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default ConsentManager;
