export const COOKIE_CHANGE_EVENT = "portfolio-cookie-change";

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
