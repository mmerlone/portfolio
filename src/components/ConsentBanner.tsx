"use client";

import { useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TermsOfServicePolicy from "./TermsOfServicePolicy";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import {
  setConsent,
  hasExplicitConsentDecision,
  deleteAnalyticsCookies,
} from "@/lib/cookies";
import { siteConfig } from "@/config/site";

/**
 * A consent banner, not a toast: it must reappear on every page load until the
 * visitor makes an explicit choice, so it deliberately has no dismiss control.
 */
const ConsentBanner = (): ReactElement | null => {
  const isClient = useIsHydrated();
  const [closed, setClosed] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const ANALYTICS_EXPIRY_DAYS = siteConfig.cookie.analytics.expiryDays;
  const MARKETING_EXPIRY_DAYS = siteConfig.cookie.marketing.expiryDays;

  const handleAcceptAll = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", true, MARKETING_EXPIRY_DAYS);
    setClosed(true);
  };

  const handleRefuseAll = (): void => {
    setConsent("analytics", false, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    deleteAnalyticsCookies();
    setClosed(true);
  };

  const handleAnalyticsOnly = (): void => {
    setConsent("analytics", true, ANALYTICS_EXPIRY_DAYS);
    setConsent("marketing", false, MARKETING_EXPIRY_DAYS);
    setClosed(true);
  };

  if (!isClient) {
    return null;
  }

  const analyticsDecided = hasExplicitConsentDecision("analytics");
  const marketingDecided = hasExplicitConsentDecision("marketing");
  const hasExplicitDecision = analyticsDecided || marketingDecided;

  if (hasExplicitDecision || closed) {
    return null;
  }

  return (
    <>
      <Card
        padding="sm"
        className="bg-card/95 fixed right-4 bottom-4 left-4 z-50 flex flex-col items-center justify-between gap-2 backdrop-blur-sm md:flex-row"
      >
        <p className="text-card-foreground text-sm">
          I use cookies to enhance your experience and track interactions. By
          clicking <strong>Accept all</strong> you agree to my{" "}
          <Button
            variant="link"
            className="text-primary h-auto p-0"
            onClick={(): void => {
              setPolicyOpen(true);
            }}
          >
            Terms of Service &amp; Cookie Policy
          </Button>
          .
        </p>
        <div className="flex shrink-0 flex-col gap-2 md:flex-row">
          <Button onClick={handleAcceptAll} className="whitespace-nowrap">
            Accept all
          </Button>
          <Button
            variant="secondary"
            onClick={handleAnalyticsOnly}
            className="whitespace-nowrap"
          >
            Analytics only
          </Button>
          <Button
            variant="destructive"
            onClick={handleRefuseAll}
            className="whitespace-nowrap"
          >
            Refuse all
          </Button>
        </div>
      </Card>
      <TermsOfServicePolicy
        open={policyOpen}
        onOpenChange={setPolicyOpen}
        onAccept={handleAcceptAll}
        onRefuse={handleRefuseAll}
        onAcceptAnalyticsOnly={handleAnalyticsOnly}
      />
    </>
  );
};

export default ConsentBanner;
