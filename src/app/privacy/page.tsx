import { type ReactElement } from "react";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: `Privacy Policy — ${portfolio.basic.name}`,
  description:
    "How this site collects, retains, and lets you control analytics and log data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage(): ReactElement {
  const { email } = portfolio.basic.contact;
  const analyticsCookieName = siteConfig.cookie.analytics.name;
  const analyticsExpiryDays = siteConfig.cookie.analytics.expiryDays;
  const marketingCookieName = siteConfig.cookie.marketing.name;
  const marketingExpiryDays = siteConfig.cookie.marketing.expiryDays;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100">
        Privacy Policy
      </h1>
      <div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-gray-600 dark:text-gray-300">
        <Section>
          <SectionTitle id="privacy-controller">
            Who Controls This Data
          </SectionTitle>
          <p>
            This website is owned and operated by {portfolio.basic.name}{" "}
            individually &#8212; there is no separate company behind it. For any
            question about this policy or the data described below, contact{" "}
            <a
              href={`mailto:${email}`}
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              {email}
            </a>
            .
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-collection">What We Collect</SectionTitle>

          <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Analytics & Performance (Legitimate Interest)
          </h3>
          <p className="mb-2">
            This category is processed under legitimate interest. You may opt out
            via the consent banner or the &ldquo;Manage Consent&rdquo; link in the footer.
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Vercel Analytics for aggregate visitor statistics (page views,
              sessions, referrer)
            </li>
            <li>
              Vercel Speed Insights for Core Web Vitals and page speed metrics
            </li>
          </ul>
          <p className="mt-2">
            These services are cookieless and collect only aggregate,
            non-identifying performance data. No personal identifiers or
            cross-site tracking.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Marketing & Measurement (Requires Explicit Consent)
          </h3>
          <p className="mb-2">
            This category requires your explicit consent before any scripts are
            loaded or cookies are set.
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Google Analytics or Google Tag Manager for detailed visitor
              statistics, user journeys, events, and conversions
              (mutually exclusive at runtime; Google Tag Manager takes
              precedence when both are configured)
            </li>
            <li>
              Ahrefs Analytics for organic traffic insights (sets cookies)
            </li>
            <li>
              Interaction events (clicks, scrolls, navigation)
            </li>
            <li>Session and usage statistics with identifiers</li>
            <li>Device and browser information</li>
          </ul>

          <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Infrastructure & Security Logging (Always)
          </h3>
          <p>
            Regardless of your cookie choice, this site&apos;s infrastructure
            providers &#8212; Cloudflare (the DNS authority for this site) and Vercel
            (the hosting platform and CDN/WAF) &#8212; transiently log request
            metadata such as IP address and User-Agent for security and
            operational purposes. This is infrastructure/security logging, not
            analytics, and it is not gated by the consent cookie.
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-retention">Retention</SectionTitle>

          <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Analytics & Performance Retention
          </h3>
          <ul className="ml-5 list-disc space-y-1">
            <li>Vercel Web Analytics: 30 days on the Hobby plan</li>
            <li>
              Vercel Speed Insights: 24-hour or 7-day reporting windows on the
              free tier used by this project (longer 30/90-day windows require
              the paid Speed Insights Plus tier), within a shared allocation of
              10,000 events per rolling 30 days
            </li>
          </ul>

          <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Marketing & Measurement Retention
          </h3>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Google Analytics: up to 14 months for identifiable user/event data
              on a free/standard (non-360) property
            </li>
            <li>
              Ahrefs Web Analytics: cookie-free and collects no personal
              identifiers by design; aggregate historical data is retained
              indefinitely
            </li>
          </ul>

          <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Infrastructure Retention
          </h3>
          <ul className="ml-5 list-disc space-y-1">
            <li>Vercel Runtime Logs: 1 hour on the Hobby plan</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle id="privacy-choices">Your Choices</SectionTitle>
          <p className="mb-2">
            Two consent cookies are used:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-950">
                {analyticsCookieName}
              </code>{" "}
              (expires in {analyticsExpiryDays} days) &#8212; Analytics & Performance
            </li>
            <li>
              <code className="rounded bg-gray-100 px-1 dark:bg-gray-950">
                {marketingCookieName}
              </code>{" "}
              (expires in {marketingExpiryDays} days) &#8212; Marketing & Measurement
            </li>
          </ul>
          <p className="mt-2 mb-2">
            Refusing or revoking consent stops new analytics collection
            immediately and deletes the consent cookie(s), but it does not
            retroactively delete data already collected by third-party providers.
          </p>
          <p className="mb-2">
            This site has no first-party user database &#8212; no accounts, no forms,
            and no backend datastore &#8212; so there is nothing here to delete beyond
            the consent cookies, which your own browser controls.
          </p>
          <p>
            For data already collected by Google Analytics, use{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Google&apos;s Analytics opt-out mechanism
            </a>
            . For Vercel infrastructure logs, there is no manual per-visitor
            deletion capability; those logs age out automatically within the
            short windows stated above.
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-contact">Contact</SectionTitle>
          <p>
            Questions about this policy can be sent to{" "}
            <a
              href={`mailto:${email}`}
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              {email}
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}