export const COOKIE_CHANGE_EVENT = "portfolio-cookie-change";

export const CONSENT_COOKIE_NAMES = {
  analytics: "mmerlone-dev-br-analytics-consent",
  marketing: "mmerlone-dev-br-marketing-consent",
} as const;

export type ConsentCategory = keyof typeof CONSENT_COOKIE_NAMES;

export const REFUSED_VALUE = "refused";

export const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document !== "undefined") {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + days * 24 * 60 * 60 * 1000);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expiresAt.toUTCString()}; path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const encodedName = `${encodeURIComponent(name)}=`;

  for (const cookie of document.cookie.split(";")) {
    const normalizedCookie = cookie.trim();
    if (normalizedCookie.startsWith(encodedName)) {
      return decodeURIComponent(normalizedCookie.substring(encodedName.length));
    }
  }

  return null;
};

const EXPIRED_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";

const IPV4_PATTERN = /^\d{1,3}(?:\.\d{1,3}){3}$/;

// Google cookie families removed when marketing is refused:
//  - Google Analytics: _ga, _ga_<ID>, _gid, _gat, _gat_<name>, and the legacy
//    Urchin (__utm*) cookies.
//  - Conversion Linker (GTM / Google tag), which stores ad-click data in
//    first-party cookies: _gcl_* (e.g. _gcl_au, _gcl_aw, _gcl_dc, _gcl_gs).
//  - _gac_<property>, written by Google Analytics when linked to Google Ads.
// Anything else, e.g. `_gaming` or `_gclid`, is untouched.
const GOOGLE_COOKIE_PATTERN =
  /^(?:_ga|_ga_[A-Za-z0-9]+|_gid|_gat|_gat_.+|_gcl_.+|_gac_.+|__utm[abctvz])$/;

const isHttps = (): boolean => window.location.protocol === "https:";

/**
 * Domain attributes under which a cookie may have been set for `hostname`:
 * the host itself and every parent with at least two labels. IP addresses and
 * single-label hosts (localhost) only support the host-only scope.
 */
const getParentDomains = (hostname: string): string[] => {
  if (IPV4_PATTERN.test(hostname) || hostname.includes(":")) return [];

  const labels = hostname.split(".").filter(Boolean);
  const domains: string[] = [];
  for (let start = 0; start <= labels.length - 2; start++) {
    domains.push(labels.slice(start).join("."));
  }
  return domains;
};

const expireCookie = (name: string, domain?: string): void => {
  const domainAttribute = domain ? `; domain=${domain}` : "";
  const secure = isHttps() ? "; Secure" : "";
  document.cookie = `${name}=; expires=${EXPIRED_DATE}; path=/${domainAttribute}; SameSite=Lax${secure}`;
};

// Consent cookies are host-only (set without a Domain attribute), and a
// Set-Cookie carrying Domain=<host> does not clear a host-only cookie.
export const deleteCookie = (name: string): void => {
  if (typeof document !== "undefined") {
    expireCookie(encodeURIComponent(name));
    window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
  }
};

/**
 * Removes the Google Analytics, Conversion Linker (`_gcl_*`), and `_gac_*`
 * cookies readable from script, at the host-only scope and every parent
 * domain scope. These belong to the marketing category. HttpOnly cookies
 * cannot be reached from JavaScript.
 */
export const deleteGoogleCookies = (
  hostname: string = typeof window === "undefined"
    ? ""
    : window.location.hostname,
): void => {
  if (typeof document === "undefined" || document.cookie === "") return;

  const names = new Set(
    document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0]?.trim() ?? "")
      .filter((name) => GOOGLE_COOKIE_PATTERN.test(name)),
  );
  const domains = getParentDomains(hostname);

  names.forEach((name) => {
    expireCookie(name);
    domains.forEach((domain) => {
      expireCookie(name, domain);
    });
  });
};

export const deleteAllConsentCookies = (): void => {
  Object.values(CONSENT_COOKIE_NAMES).forEach(deleteCookie);
};

export const getConsent = (category: ConsentCategory): boolean => {
  const cookieName = CONSENT_COOKIE_NAMES[category];
  return getCookie(cookieName) === "true";
};

export const hasExplicitConsentDecision = (
  category: ConsentCategory,
): boolean => {
  const cookieName = CONSENT_COOKIE_NAMES[category];
  return getCookie(cookieName) !== null;
};

export const setConsent = (
  category: ConsentCategory,
  granted: boolean,
  expiryDays: number,
): void => {
  // Single revocation path: Google cookies are marketing cookies, so they are
  // removed whenever marketing is not granted and never otherwise.
  if (category === "marketing" && !granted) {
    deleteGoogleCookies();
  }
  const cookieName = CONSENT_COOKIE_NAMES[category];
  setCookie(cookieName, granted ? "true" : REFUSED_VALUE, expiryDays);
};
