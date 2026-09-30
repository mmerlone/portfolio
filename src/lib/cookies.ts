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

export const deleteCookie = (name: string): void => {
  if (typeof document !== "undefined") {
    const domain = window.location.hostname;
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; SameSite=Lax`;
    window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
  }
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
  const cookieName = CONSENT_COOKIE_NAMES[category];
  if (granted) {
    setCookie(cookieName, "true", expiryDays);
  } else {
    setCookie(cookieName, REFUSED_VALUE, expiryDays);
  }
};

export const deleteAnalyticsCookies = (): void => {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname;
  const analyticsCookies = [
    "_ga",
    "_gid",
    "_gat",
    "__utma",
    "__utmb",
    "__utmc",
    "__utmz",
    "_ga_*",
  ];

  analyticsCookies.forEach((name) => {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
  });
};
