# Marcio Merlone Portfolio

![License](https://img.shields.io/github/license/mmerlone/portfolio)
![Vercel](https://img.shields.io/badge/deployed%20on-vercel-000?logo=vercel)
![Version](https://img.shields.io/badge/version-1.0.2-blue)

This repository contains a Next.js 16 portfolio for Marcio Merlone. It presents selected engineering work, career path, selected experience, compressed technical skills, résumé, and contact information. Shared portfolio data and the generated Markdown representation also retain languages, certifications, education, and the full professional history.

The current implementation uses React 19, TypeScript, Tailwind CSS 4, Sass, Open Props, Phosphor Icons, and `next-themes`. Framer Motion, GSAP, Three.js, React Three Fiber, and Drei are not dependencies. The credits carousel remains a React and CSS implementation with isolated transforms and reduced-motion handling.

[Visit the live site](https://mmerlone.dev.br)

---

## Table of Contents

- [Getting Started](#getting-started)
- [About the Project](#about-the-project)
- [Current Architecture and Navigation](#current-architecture-and-navigation)
  - [Public Routes and Machine-Readable Outputs](#public-routes-and-machine-readable-outputs)
- [Site Configuration](#site-configuration)
  - [Site Config File](#site-config-file)
  - [Site Data Files](#site-data-files)
- [Features & Environment Variables](#features--environment-variables)
  - [Managing Environment Variables](#managing-environment-variables)
  - [Analytics & Cookie Consent](#analytics--cookie-consent)
  - [Search Engine Verification](#search-engine-verification)
- [Provider-Owned Security, TLS, and CI](#provider-owned-security-tls-and-ci)
- [Credits](#credits)
- [Historical Documentation](#historical-documentation)
- [Learn More](#learn-more)
- [License](#license)
- [Contributing](#contributing)
- [Technologies](#technologies)
- [Contact](#contact)

---

## Getting Started

This project uses Node.js 25.9.0 (see `.nvmrc`) and `pnpm` 10.33.0 (see `packageManager`). Install dependencies and start the development server with:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in a browser. Changes are reflected by the Next.js development server.

For a production build, run `pnpm build` followed by `pnpm start`. Regenerate the Open Graph image after changing the profile asset with `pnpm generate:og-image`.

The homepage is composed in `src/app/page.tsx` from focused section components. Below-fold sections use `next/dynamic` with `Suspense`, and section content is sourced from the typed data modules under `src/data/`.

Run the repository quality gates with:

```bash
pnpm lint
pnpm type-check
pnpm dead-code
pnpm test
pnpm build
```

Use `pnpm format:check` to check formatting without changing files.

---

## About the Project

This portfolio was built with [Next.js](https://nextjs.org/) and showcases:

- A **Selected engineering work** section with concise evidence for YwyBase, two published npm packages, and the ArcTouch/Cirrus Aircraft article.
- A **How I build** section describing five engineering principles.
- A **My path** section tracing industrial systems, infrastructure, and software/product engineering.
- A **Selected experience** section for confidential employer and client work.
- A compressed **Technical Skills** disclosure with the full retained inventory in shared data.
- A résumé download and a dedicated contact page.
- Shared data and a generated Markdown representation containing languages, certifications, education, and the full professional history; the dedicated credentials and education components are retained but are not mounted in the current HTML routes.

---

## Current Architecture and Navigation

The App Router homepage is composed from focused section components and shared layout primitives. The current public labels and destinations are:

| Current label             | Destination                   |
| ------------------------- | ----------------------------- |
| About                     | `/about`                      |
| Selected engineering work | `/#selected-engineering-work` |
| How I build               | `/#how-i-build`               |
| My path                   | `/#my-path`                   |
| Selected experience       | `/#selected-experience`       |
| Skills                    | `/#skills`                    |
| Résumé                    | `/#resume`                    |
| Contact                   | `/contact`                    |
| Under the Hood            | `/under-the-hood`             |

The homepage order is Hero, Selected engineering work, How I build, My path, Selected experience, Technical Skills, and Résumé. Credentials and Education remain available in the shared portfolio data for negotiated output; Credits is rendered on `/about`. The reusable `GetInTouch` component (email, social links, location) renders on `/contact` only. The Under the Hood route records repository implementation status and keeps external audit results pending until dated evidence exists.

The root layout provides the theme provider, scroll-progress indicator, navigation bar, footer, consent toast, and structured data. The homepage also mounts a reduced-motion-aware scroll-to-top control. `ConfigBar` is currently the theme toggle, with Light, System, and Dark choices.

The global style entry point imports local variables, the theme-toggle stylesheet, Tailwind, the selected Open Props token modules, base styles, the protected carousel stylesheet, and the scroll-progress stylesheet. The removed legacy globe, quote, weather, GitHub-stats, and animation-library implementations are absent. The dedicated global effect styles are the theme toggle and scroll-progress indicator; ordinary component transitions and hover/focus states remain. The carousel remains a protected exception with isolated CSS transforms and reduced-motion handling.

### Public Routes and Machine-Readable Outputs

The current public surface also includes:

- `/privacy` — privacy policy and infrastructure logging disclosure.
- `/index.md` — explicit full Markdown representation of the portfolio.
- `/` with `Accept: text/markdown` — content-negotiated Markdown via `src/proxy.ts`; HTML remains the default.
- `/llms.txt` — agent-oriented site guidance and contact links.
- `/robots.txt` — crawler directives, `Content-Signal`, and sitemap location.
- `/sitemap.xml` — homepage, About, Contact, Privacy, and Under the Hood entries.
- `/documents/MarcioMerlone.pdf` — downloadable résumé.
- `/manifest.json` — PWA metadata and icons.

The Markdown renderer is implemented in `src/lib/renderPortfolioMarkdown.ts`; the explicit route is `src/app/index.md/route.ts`. Content negotiation and its `Vary: Accept` handling are implemented in `src/lib/acceptNegotiation.ts`, `src/lib/varyHeader.ts`, and `src/proxy.ts`.

---

## Site Configuration

### Site Config File

Update the site-wide configuration in `/src/config/site.ts` with your details:

- **Site:** URL, Open Graph image, and profile image path.
- **Contact and social:** Email, location, and social-profile URLs in `/src/data/portfolio.ts`.
- **Navigation & Footer:** Menu items, copyright text, and the footer links for About, Contact, Privacy Policy, and the Terms of Service/Cookie Policy dialog.
- **Cookie Consent:** Cookie name and expiry.
- **Analytics and verification:** Optional Google Analytics, Google Tag Manager, Ahrefs, and search-engine verification settings; Vercel Analytics and Speed Insights render after consent.
- **CTA and SEO:** Call-to-action text and SEO metadata.

### Site Data Files

Content for various sections is maintained in `/src/data/`:

- **Portfolio (identity, expertise, technical inventory, professional experience, selected challenges, open-source work, education, certifications, languages, résumé, and social links):** `/src/data/portfolio.ts`
- **Career path stages:** `/src/data/pathStages.ts`
- **Credits:** `/src/data/credits.ts`
- **Professional experience detail:** `/src/data/experiences.ts`
- **Education detail:** `/src/data/education.ts`
- **Selected experience:** `/src/data/challenges.ts`
- **Selected engineering work:** `/src/data/projects.ts`

Ensure these files reflect your updated portfolio content.

---

## Features & Environment Variables

### Managing Environment Variables

Configuration values—including public analytics identifiers and optional verification tokens—are stored in the `.env` file at the project root. A sample of these keys is provided via `.env.example`.

To set up:

```bash
cp .env.example .env
```

Then edit the `.env` file and insert your production or development values.

### Analytics & Cookie Consent

This project includes a Terms of Service component with cookie handling and optional analytics integrations.

- **Cookie Consent:** The consent banner appears only if the user has not previously accepted the terms. When the user clicks **Accept**, a cookie (default: `mmerlone-dev-br-analytics-consent`) is set for one year, preventing the banner from reappearing.
- **Analytics:** Analytics integrations are loaded only after the user accepts the cookie consent notice.
  - **Google Analytics:** Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXX"` in your `.env` to enable.
  - **Google Tag Manager:** Set `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID="GTM-XXXXXX"` in your `.env` to enable.
  - **Ahrefs Analytics:** Set `NEXT_PUBLIC_AHREFS_ANALYTICS_KEY="..."` to enable. This site identifier is public by design and is not a secret.
  - When both are configured, Google Tag Manager takes precedence and should own the Google Analytics tag to prevent duplicate page views.

If these variables are not set, the respective features are disabled automatically.

### Search Engine Verification

Search-console verification metadata is optional and omitted when unset:

- **Google Search Console:** Set `GOOGLE_SITE_VERIFICATION` to the token from the `google-site-verification` meta tag.
- **Bing Webmaster Tools:** Set `BING_SITE_VERIFICATION` to the token from the `msvalidate.01` meta tag.

---

## Provider-Owned Security, TLS, and CI

This section is an owner-run record, not a claim that provider settings have been verified. No dashboard values or external audit results are asserted here. Marcio Merlone owns provider changes and must replace each pending entry with a dated observation and evidence link before treating the inventory as complete.

### Authority Matrix

| Area                         | Authority and dashboard location                                                                                                                                                                                                                                         | Owner          | Evidence status                                                                           | Rollback record                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare DNS / Vercel edge              | Cloudflare dashboard for `mmerlone.dev.br`: DNS. Vercel project dashboard for `mmerlone.dev.br`: Settings, Domains, Deployments, and Analytics. Cloudflare owns edge DNS; Vercel owns TLS mode and minimum policy, HTTPS redirects, HSTS, WAF/managed rules, cache behavior, and edge response-header modifications.                                                    | Marcio Merlone | Pending owner inventory and direct-edge capture.                                          | Record the prior values and the provider change-history or revert action before changing a setting.                                   |
| Vercel origin and deployment | Vercel project dashboard for `mmerlone.dev.br`: Settings, Domains, Deployments, and Analytics. Owns the hosting project, custom-domain assignment, deployment branch and environment, provider firewall/WAF state, analytics state, and provider-level response headers. | Marcio Merlone | Pending owner inventory and direct-origin capture.                                        | Record the prior deployment and project settings; use the provider's previous production deployment or settings history for rollback. |
| GitHub repository controls   | GitHub repository Settings, Actions, Branches, and Code security pages for `mmerlone/portfolio`. Owns Actions, branch protection, required checks, Dependabot alerts and updates, and workflow permissions. GitHub is not an HTTP-header provider for this site.         | Marcio Merlone | Workflow exists; provider settings remain pending owner inventory.                        | Revert the workflow or repository-setting change and preserve the required-check policy.                                              |
| Application response headers | Repository-owned `next.config.ts` and its header tests. The application owns CSP and browser-hardening headers and must not emit HSTS.                                                                                                                                   | Marcio Merlone | Local build and focused header tests pass; provider and edge verification remain pending. | Revert the configuration change and redeploy from the previous known-good revision.                                                   |

### Cloudflare Checklist

- Confirm Cloudflare is the authoritative DNS provider for `mmerlone.dev.br` on the Free zone plan.
- Verify all DNS records are set to **DNS only** (grey-clouded), so Cloudflare does not proxy or cache site content; Vercel owns the edge, TLS, HSTS, WAF, and caching.
- Confirm DNSSEC is configured for the zone and records the expected DS fingerprint.
- Review CAA records authorize only the intended certificate providers.
- Since Cloudflare is DNS-only here, no Cloudflare edge caching or Transform Rules apply, so `Vary: Accept` is owned by Vercel and the HTML/Markdown variants are never collapsed by Cloudflare.
- Record the dashboard location, owner, date, evidence link, and rollback note for every completed item.

### Vercel Checklist

- Confirm the canonical custom domain is assigned to the intended project and automatic HTTPS is enabled.
- Review project firewall/WAF rules and environment-specific deployment behavior.
- Confirm direct-origin and preview responses receive the application-owned headers from `next.config.ts` and do not add HSTS.
- Confirm preview and production deployments use the same application security policy or document intentional differences.
- Record the dashboard location, owner, date, evidence link, and rollback note for every completed item.

### GitHub Checklist

- Enable GitHub Actions, Dependabot security alerts and version updates, and branch protection for `main`.
- Require the repository quality checks and any later-approved Lighthouse CI check before merging.
- Use minimal workflow permissions (`contents: read` unless a deployment step explicitly requires more) and never place provider credentials in workflow files or logs.
- Record the dashboard location, owner, date, evidence link, and rollback note for every completed item.

### CI Workflow and Maintenance

The repository workflow is `.github/workflows/ci.yml`. It runs on pull requests and pushes to `main` with these checks:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
pnpm dead-code
pnpm test
pnpm build
```

Lighthouse CI remains deferred until a stable three-run baseline exists and an explicit budget is approved.

Marcio Merlone owns the workflow and provider settings. Apply this maintenance policy:

- **Review cadence:** Review dependency and security alerts monthly; review Cloudflare (DNS), Vercel, and GitHub protection settings and rerun external audits quarterly; also review immediately after a provider, domain, analytics, CSP, or deployment-architecture change.
- **Failure response:** Deterministic repository checks block merge and must be fixed in the same pull request. Investigate flaky infrastructure failures before rerunning; do not bypass a required check. Treat a scheduled or external audit regression as an issue to triage within seven days, escalating immediately for certificate, HTTPS, HSTS, or exploitable security failures.
- **Budget revisions:** Change performance budgets only in a dedicated pull request containing before/after evidence and rationale. Prefer improving the implementation; never lower a threshold solely to admit a regression.
- **Badge lifecycle:** Retain only the README CI badge when it is backed by `ci.yml` runs on `main`. Remove or update it in the same change if the workflow is renamed, disabled, or stops publishing a valid status. Do not add performance badges.
- **Provider-change approval:** Marcio is the required approver for DNS, TLS, HSTS, CSP authority, WAF, cache, production-domain, branch-protection, workflow-permission, and deployment-integration changes. Repository-only dependency updates may follow the normal reviewed pull-request path.

---

## Credits

This project acknowledges the following tools, services, and resources:

- **Vercel:** Hosting and deployment platform ([vercel.com](https://vercel.com/)).
- **Vercel Speed Insights:** Performance insights ([vercel.com/docs/speed-insights](https://vercel.com/docs/speed-insights)).
- **Google Analytics:** Web analytics ([analytics.google.com](https://analytics.google.com/)).
- **Google Tag Manager:** Tag management; it takes precedence over Google Analytics when both are configured ([tagmanager.google.com](https://tagmanager.google.com/)).
- **Ahrefs Analytics:** Cookieless web analytics ([ahrefs.com/web-analytics](https://ahrefs.com/web-analytics)).
- **Cloudflare:** DNS provider ([cloudflare.com](https://cloudflare.com/)).
- **improvmx.com:** Email forwarding service ([improvmx.com](https://improvmx.com/)).
- **Next.js:** The React framework for production ([nextjs.org](https://nextjs.org/)).
- **React:** The JavaScript library for building user interfaces ([react.dev](https://react.dev/)).
- **Open Props:** CSS token library for design system primitives ([open-props.style](https://open-props.style/)).
- **Phosphor Icons:** Icon family used throughout this interface ([phosphoricons.com](https://phosphoricons.com/)).
- **Tailwind CSS:** Utility-first CSS framework ([tailwindcss.com](https://tailwindcss.com/)).

_Kudos to everyone involved!_

---

## Historical Documentation

`CHANGELOG.md` records past releases. Its version 1.0.0 entries mentioning Framer Motion, GSAP, Three.js, React Three Fiber, Aceternity UI, and visual effects describe historical implementation only. The resolved drop also covers Drei, which is not listed as a historical changelog entry. These entries are not current stack claims.

The current portfolio does not use those dropped libraries. The protected credits carousel uses isolated CSS transforms and is not evidence that Three.js, React Three Fiber, Drei, Framer Motion, or GSAP is active.

---

## Learn More

For further documentation on Next.js and additional resources, visit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)

---

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

---

## Contributing

Contributions are welcome! If you have suggestions for improvements, bug fixes, or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear messages.
4. Open a pull request describing your changes.

---

## Technologies

This project utilizes the following technologies:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Sass
- ESLint
- Prettier
- Jest
- jest-axe
- Knip
- Phosphor Icons
- Vercel

---

## Contact

- **Email:** [mmerlone@gmail.com](mailto:mmerlone@gmail.com)
- **Location:** Araucária, PR, Brazil — Curitiba Area, Brazil
- **LinkedIn:** [linkedin.com/in/mmerlone](https://linkedin.com/in/mmerlone)
- **GitHub:** [github.com/mmerlone](https://github.com/mmerlone)
- **Website:** [mmerlone.dev.br](https://mmerlone.dev.br/)
- **Instagram:** [instagram.com/mmerlone](https://instagram.com/mmerlone)
