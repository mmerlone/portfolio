import { type ReactElement } from "react";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: `Under the Hood — ${portfolio.basic.name}`,
  description:
    "Implementation and verification status for security, accessibility, performance, TLS, and the portfolio stack.",
  alternates: {
    canonical: "/under-the-hood",
  },
};

const statusByArea = [
  {
    area: "Browser security headers",
    status: "Implemented and tested locally",
    evidence:
      "Application-owned CSP and hardening headers are defined in src/lib/buildSecurityHeaders.ts and emitted by next.config.ts. The application does not emit HSTS.",
  },
  {
    area: "Vercel edge and Cloudflare DNS authority",
    status: "External verification pending",
    evidence:
      "Provider settings, direct-origin behavior, edge behavior, and duplicate-header checks require dashboard inventory and dated captures.",
  },
  {
    area: "Automated accessibility",
    status: "Tested locally",
    evidence:
      "Jest and jest-axe tests cover the main pages and key sections. This is not a substitute for a manual WCAG 2.1 AA audit.",
  },
  {
    area: "Lighthouse and PageSpeed",
    status: "External result pending",
    evidence:
      "No production or local production-build performance score is claimed until a dated run is recorded.",
  },
  {
    area: "W3C Nu Validator",
    status: "External result pending",
    evidence:
      "No HTML validation error count is claimed until the built page has been checked and the result is recorded.",
  },
  {
    area: "TLS and certificate verification",
    status: "External result pending",
    evidence:
      "Vercel settings (TLS, HSTS, edge caching, WAF) and Cloudflare DNS settings and a dated Qualys SSL Labs result remain owner-run evidence.",
  },
  {
    area: "Technology stack",
    status: "Implemented and documented",
    evidence:
      "Framer Motion, GSAP, Three.js, React Three Fiber, and Drei are not part of the current portfolio stack. The protected credits carousel remains a CSS implementation.",
  },
  {
    area: "CI quality gates",
    status: "Implemented; provider settings pending",
    evidence:
      ".github/workflows/ci.yml runs install, lint, type-check, dead-code, test, and build checks. GitHub Actions, Dependabot, and branch protection still require owner inventory.",
  },
] as const;

export default function UnderTheHoodPage(): ReactElement {
  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100">
        Under the Hood
      </h1>
      <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        This page records what is implemented in the repository, what has been
        tested locally, and what still requires a dated external or provider
        result. It does not turn targets or provisional observations into
        verified claims.
      </p>

      <div className="mx-auto max-w-5xl space-y-8">
        <Section>
          <SectionTitle id="verification-status">
            Verification Status
          </SectionTitle>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Area</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Evidence boundary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {statusByArea.map((item) => (
                  <tr key={item.area} className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                      {item.area}
                    </td>
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">
                      {item.status}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {item.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <SectionTitle id="provider-authority">
            Provider Authority
          </SectionTitle>
          <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
            Vercel owns transport, edge caching, and WAF behavior; Cloudflare
            owns DNS; GitHub owns repository automation and branch protection,
            and this Next.js application owns its browser-hardening headers. The
            provider inventory and rollback record remain in the authority
            matrix until Marcio Merlone supplies dated evidence.
          </p>
          <a
            href="https://github.com/mmerlone/portfolio/blob/main/PROVIDER-AUTHORITY-MATRIX.md"
            className="inline-flex font-medium text-orange-600 hover:underline dark:text-orange-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the provider authority matrix
          </a>
        </Section>

        <Section>
          <SectionTitle id="repository-evidence">
            Repository Evidence
          </SectionTitle>
          <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
            <li>
              <a
                href="https://github.com/mmerlone/portfolio/blob/main/README.md"
                className="text-orange-600 hover:underline dark:text-orange-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                README maintenance and validation commands
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mmerlone/portfolio/blob/main/.github/workflows/ci.yml"
                className="text-orange-600 hover:underline dark:text-orange-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                CI workflow source
              </a>
            </li>
            <li>
              <a
                href={`mailto:${portfolio.basic.contact.email}`}
                className="text-orange-600 hover:underline dark:text-orange-400"
              >
                Contact {portfolio.basic.name}
              </a>
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
