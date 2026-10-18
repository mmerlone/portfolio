/**
 * Builds the application-owned HTTP security headers emitted for every
 * response through `next.config.ts` async `headers()`.
 *
 * Pure and side-effect free: it accepts the environment object it should read
 * (defaulting to `process.env`) so it can be unit-tested without a running
 * server, following the existing `src/lib/__tests__/varyHeader.test.ts` style.
 *
 * Vercel owns HSTS and transport controls at the edge, so this helper never emits
 * `Strict-Transport-Security`. The Content-Security-Policy is scoped to
 * origins the application actually uses: self-hosted assets, the Vercel
 * web-analytics loader origin (needed once analytics consent is granted),
 * Next.js RSC runtime inline scripts, and the
 * env-gated Google/Ahrefs script origins. Third-party origins that are not
 * enabled by an environment variable are never added to the policy.
 * 'unsafe-inline' is required for Next.js App Router RSC runtime scripts
 * (e.g. $RC directives) which the framework injects per-request and cannot
 * be individually hashed or nonced.
 */

export function buildSecurityHeaders({
  env = process.env,
}: { readonly env?: Partial<NodeJS.ProcessEnv> } = {}): Record<string, string> {
  // Truthiness (not nullishness) mirrors the runtime provider selection in
  // AnalyticsWrapper, so an empty-string id never masks a valid one.
  const hasGoogleAnalytics =
    Boolean(env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) ||
    Boolean(env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
  const hasAhrefs = Boolean(env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY);

  // The Vercel Analytics and Speed Insights loader origin is listed because it
  // is needed once analytics consent is granted: in development the loader
  // comes from this domain; in production it falls back to same-origin
  // `/_vercel/*`, which `self` already covers. Google GA/GTM and Ahrefs are
  // only declared when their env-gated identifiers are actually set.
  const scriptSrc = [
    "'self'",
    "https://va.vercel-scripts.com",
    "'unsafe-inline'",
  ];
  // Next.js dev mode uses eval() for React Fast Refresh/debugging; never allowed in production.
  // 'unsafe-inline' is required for Next.js App Router RSC runtime inline scripts (e.g. $RC directives).
  if (env.NODE_ENV !== "production") {
    scriptSrc.push("'unsafe-eval'");
  }
  if (hasGoogleAnalytics) {
    scriptSrc.push("https://www.googletagmanager.com");
  }
  if (hasAhrefs) {
    scriptSrc.push("https://analytics.ahrefs.com");
  }

  const connectSrc = ["'self'", "https://va.vercel-scripts.com"];
  if (hasGoogleAnalytics) {
    connectSrc.push(
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
    );
  }
  if (hasAhrefs) {
    connectSrc.push("https://analytics.ahrefs.com", "https://ahrefs.com");
  }

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connectSrc.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join("; ");

  return {
    "Content-Security-Policy": csp,
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  };
}
