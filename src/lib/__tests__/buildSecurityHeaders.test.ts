import { buildSecurityHeaders } from "@/lib/buildSecurityHeaders";

describe("buildSecurityHeaders", () => {
  it("returns the full hardening header set", () => {
    const headers = buildSecurityHeaders({ env: {} });

    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toBe(
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    );
  });

  it("never emits Strict-Transport-Security (Vercel owns it)", () => {
    const headers = buildSecurityHeaders({ env: {} });
    expect(headers["Strict-Transport-Security"]).toBeUndefined();
  });

  it("scopes CSP to self-hosted assets and the always-on Vercel loader", () => {
    const headers = buildSecurityHeaders({ env: {} });
    const csp = headers["Content-Security-Policy"];

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("https://va.vercel-scripts.com");
    // No analytics origins are invented when their env-gated IDs are unset.
    expect(csp).not.toContain("googletagmanager.com");
    expect(csp).not.toContain("analytics.ahrefs.com");
  });

  it("adds Google origins only when an env-gated ID is set", () => {
    const headers = buildSecurityHeaders({
      env: { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "G-XXXX" },
    });
    expect(headers["Content-Security-Policy"]).toContain(
      "https://www.googletagmanager.com",
    );
  });

  it("adds Ahrefs origins only when its env-gated key is set", () => {
    const headers = buildSecurityHeaders({
      env: { NEXT_PUBLIC_AHREFS_ANALYTICS_KEY: "ahrefs-key" },
    });
    const csp = headers["Content-Security-Policy"];
    expect(csp).toContain("https://analytics.ahrefs.com");
    expect(csp).not.toContain("googletagmanager.com");
  });

  it("is deterministic and side-effect free", () => {
    const a = buildSecurityHeaders({ env: {} });
    const b = buildSecurityHeaders({ env: {} });
    expect(a).toEqual(b);
  });
});
