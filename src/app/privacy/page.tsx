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
  const { name: cookieName, expiryDays } = siteConfig.cookie;

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-foreground mb-6 text-center text-4xl font-bold md:text-5xl">
        Privacy Policy
      </h1>
      <div className="text-muted-foreground mx-auto max-w-3xl space-y-8 leading-relaxed">
        <Section>
          <SectionTitle id="privacy-controller">
            Who Controls This Data
          </SectionTitle>
          <p>
            This website is owned and operated by {portfolio.basic.name}{" "}
            individually — there is no separate company behind it. For any
            question about this policy or the data described below, contact{" "}
            <a href={`mailto:${email}`} className="text-accent hover:underline">
              {email}
            </a>
            .
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-collection">What We Collect</SectionTitle>

          <h3 className="text-foreground mt-4 mb-2 text-xl font-semibold">
            Analytics (Only With Your Consent)
          </h3>
          <p className="mb-2">
            If you accept the cookie consent prompt, this site may load:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              Google Analytics or Google Tag Manager for visitor statistics
              (mutually exclusive at runtime; Google Tag Manager takes
              precedence when both are configured)
            </li>
            <li>Ahrefs Analytics for cookieless traffic insights</li>
            <li>Vercel Analytics for performance monitoring</li>
            <li>Vercel Speed Insights for page speed metrics</li>
          </ul>
          <p className="mt-2">
            Vercel Analytics and Vercel Speed Insights are cookieless and only
            collect aggregate, non-identifying performance data.
          </p>

          <h3 className="text-foreground mt-6 mb-2 text-xl font-semibold">
            Infrastructure &amp; Security Logging (Always)
          </h3>
          <p>
            Regardless of your cookie choice, this site&apos;s infrastructure
            providers — Cloudflare (the CDN/WAF in front of this site) and
            Vercel (the hosting platform) — transiently log request metadata
            such as IP address and User-Agent for security and operational
            purposes. This is infrastructure/security logging, not analytics,
            and it is not gated by the consent cookie.
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-retention">Retention</SectionTitle>

          <h3 className="text-foreground mt-4 mb-2 text-xl font-semibold">
            Analytics Retention
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
            <li>Vercel Web Analytics: 30 days on the Hobby plan</li>
          </ul>

          <h3 className="text-foreground mt-6 mb-2 text-xl font-semibold">
            Infrastructure Retention
          </h3>
          <ul className="ml-5 list-disc space-y-1">
            <li>Vercel Runtime Logs: 1 hour on the Hobby plan</li>
            <li>Cloudflare Security Analytics: 7 days on the Free zone plan</li>
            <li>Cloudflare Security Events: 24 hours on the Free zone plan</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle id="privacy-choices">Your Choices</SectionTitle>
          <p className="mb-2">
            The consent cookie is named{" "}
            <code className="bg-surface-muted rounded px-1">{cookieName}</code>{" "}
            and lasts {expiryDays} days. Refusing or revoking consent stops new
            analytics collection immediately, but it does not retroactively
            delete data already collected.
          </p>
          <p className="mb-2">
            This site has no first-party user database — no accounts, no forms,
            and no backend datastore — so there is nothing here to delete beyond
            the consent cookie itself, which your own browser controls.
          </p>
          <p>
            For data already collected by Google Analytics, use{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google&apos;s Analytics opt-out mechanism
            </a>
            . For Cloudflare and Vercel infrastructure logs, there is no manual
            per-visitor deletion capability; those logs age out automatically
            within the short windows stated above.
          </p>
        </Section>

        <Section>
          <SectionTitle id="privacy-contact">Contact</SectionTitle>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${email}`} className="text-accent hover:underline">
              {email}
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  );
}
