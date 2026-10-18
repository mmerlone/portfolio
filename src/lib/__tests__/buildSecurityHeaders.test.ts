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

  it("scopes CSP to self-hosted assets and the consent-gated Vercel loader origin", () => {
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

  describe("analytics configuration matrix", () => {
    const GTM_SCRIPT = "https://www.googletagmanager.com";
    const GA_CONNECT = [
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
    ];
    const AHREFS_SCRIPT = "https://analytics.ahrefs.com";
    const AHREFS_CONNECT = [
      "https://analytics.ahrefs.com",
      "https://ahrefs.com",
    ];

    const directive = (
      env: Partial<NodeJS.ProcessEnv>,
      name: string,
    ): readonly string[] => {
      const csp = buildSecurityHeaders({ env })["Content-Security-Policy"];
      const found = csp
        .split("; ")
        .find((part: string): boolean => part.startsWith(`${name} `));
      return found === undefined ? [] : found.split(" ").slice(1);
    };

    it.each<{
      readonly name: string;
      readonly env: Partial<NodeJS.ProcessEnv>;
      readonly google: boolean;
    }>([
      { name: "both ids absent", env: {}, google: false },
      {
        name: "GA only",
        env: { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "G-XXXX" },
        google: true,
      },
      {
        name: "GTM only",
        env: { NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "GTM-XXXX" },
        google: true,
      },
      {
        name: "both set",
        env: {
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "G-XXXX",
          NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "GTM-XXXX",
        },
        google: true,
      },
      {
        name: "empty GA with valid GTM",
        env: {
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "",
          NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "GTM-XXXX",
        },
        google: true,
      },
      {
        name: "empty GTM with valid GA",
        env: {
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "G-XXXX",
          NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "",
        },
        google: true,
      },
      {
        name: "both empty strings",
        env: {
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "",
          NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "",
        },
        google: false,
      },
    ])("Google origins for $name", ({ env, google }) => {
      const scriptSrc = directive(env, "script-src");
      const connectSrc = directive(env, "connect-src");

      expect(scriptSrc.includes(GTM_SCRIPT)).toBe(google);
      for (const origin of GA_CONNECT) {
        expect(connectSrc.includes(origin)).toBe(google);
      }
    });

    it.each<{
      readonly name: string;
      readonly env: Partial<NodeJS.ProcessEnv>;
      readonly ahrefs: boolean;
    }>([
      { name: "key absent", env: {}, ahrefs: false },
      {
        name: "empty key",
        env: { NEXT_PUBLIC_AHREFS_ANALYTICS_KEY: "" },
        ahrefs: false,
      },
      {
        name: "non-empty key",
        env: { NEXT_PUBLIC_AHREFS_ANALYTICS_KEY: "ahrefs-key" },
        ahrefs: true,
      },
    ])("Ahrefs origins for $name", ({ env, ahrefs }) => {
      expect(directive(env, "script-src").includes(AHREFS_SCRIPT)).toBe(ahrefs);
      for (const origin of AHREFS_CONNECT) {
        expect(directive(env, "connect-src").includes(origin)).toBe(ahrefs);
      }
    });

    it.each<{
      readonly nodeEnv: "production" | "development";
      readonly unsafeEval: boolean;
    }>([
      { nodeEnv: "production", unsafeEval: false },
      { nodeEnv: "development", unsafeEval: true },
    ])(
      "'unsafe-eval' presence is $unsafeEval when NODE_ENV is $nodeEnv",
      ({ nodeEnv, unsafeEval }) => {
        const csp = buildSecurityHeaders({ env: { NODE_ENV: nodeEnv } })[
          "Content-Security-Policy"
        ];
        expect(csp.includes("'unsafe-eval'")).toBe(unsafeEval);
      },
    );
  });

  it("is deterministic and side-effect free", () => {
    const a = buildSecurityHeaders({ env: {} });
    const b = buildSecurityHeaders({ env: {} });
    expect(a).toEqual(b);
  });
});
