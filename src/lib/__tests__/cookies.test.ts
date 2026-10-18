import {
  CONSENT_COOKIE_NAMES,
  COOKIE_CHANGE_EVENT,
  deleteAllConsentCookies,
  deleteCookie,
  deleteGoogleCookies,
  getConsent,
  getCookie,
  setConsent,
} from "@/lib/cookies";

const GOOGLE_COOKIES = [
  "_ga",
  "_ga_ABC123",
  "_gid",
  "_gat",
  "_gat_UA-1",
  "__utma",
  "__utmb",
  "__utmc",
  "__utmt",
  "__utmv",
  "__utmz",
  "_gcl_au",
  "_gcl_aw",
  "_gcl_dc",
  "_gcl_gs",
  "_gcl_gb",
  "_gcl_ha",
  "_gac_UA-1-1",
  "_gac_G-ABC123",
  "_gac_gb_G-ABC123",
] as const;

const UNRELATED_COOKIES = [
  "session_theme",
  "_gaming",
  "_ga_",
  "_gat2",
  "_gcl",
  "_gcl_",
  "_gclid",
  "_gac",
  "_gac_",
  "_gacx",
] as const;

const visibleNames = (): string[] =>
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim() ?? "")
    .filter(Boolean);

const clearAllCookies = (): void => {
  visibleNames().forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

const seed = (names: readonly string[]): void => {
  names.forEach((name) => {
    document.cookie = `${name}=1; path=/`;
  });
};

describe("cookies", () => {
  beforeEach(clearAllCookies);
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("deleteGoogleCookies", () => {
    it.each(GOOGLE_COOKIES)("removes %s", (name) => {
      seed([name]);
      expect(getCookie(name)).toBe("1");

      deleteGoogleCookies();

      expect(getCookie(name)).toBeNull();
    });

    it("removes every Google cookie in one call", () => {
      seed(GOOGLE_COOKIES);

      deleteGoogleCookies();

      expect(visibleNames()).toEqual([]);
    });

    it("preserves unrelated cookies, including look-alike names", () => {
      seed([...GOOGLE_COOKIES, ...UNRELATED_COOKIES]);

      deleteGoogleCookies();

      expect(visibleNames().sort()).toEqual([...UNRELATED_COOKIES].sort());
    });

    it("does not touch the consent cookies", () => {
      setConsent("analytics", true, 1);
      setConsent("marketing", true, 1);
      seed(["_ga"]);

      deleteGoogleCookies();

      expect(getConsent("analytics")).toBe(true);
      expect(getConsent("marketing")).toBe(true);
    });

    it("does nothing when no cookies exist", () => {
      const setter = jest.spyOn(document, "cookie", "set");

      deleteGoogleCookies();

      expect(setter).not.toHaveBeenCalled();
    });

    it("expires each name at the host-only scope and every parent domain", () => {
      seed(["_ga_ABC123"]);
      const setter = jest.spyOn(document, "cookie", "set");

      deleteGoogleCookies("www.mmerlone.dev.br");

      const written = setter.mock.calls.map(([value]) => value);
      expect(written).toHaveLength(4);
      written.forEach((value) => {
        expect(value).toMatch(
          /^_ga_ABC123=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=\/(; domain=[^;]+)?; SameSite=Lax$/,
        );
      });
      expect(
        written.filter((value) => !value.includes("domain=")),
      ).toHaveLength(1);
      expect(
        written
          .filter((value) => value.includes("domain="))
          .map((value) => /domain=([^;]+)/.exec(value)?.[1]),
      ).toEqual(["www.mmerlone.dev.br", "mmerlone.dev.br", "dev.br"]);
    });

    it.each(["localhost", "127.0.0.1", "::1"])(
      "uses only the host-only scope for %s",
      (hostname) => {
        seed(["_ga"]);
        const setter = jest.spyOn(document, "cookie", "set");

        deleteGoogleCookies(hostname);

        expect(setter).toHaveBeenCalledTimes(1);
        expect(setter.mock.calls[0]?.[0]).not.toContain("domain=");
      },
    );
  });

  describe("deleteCookie", () => {
    it("removes host-only cookies without forcing a Domain attribute", () => {
      document.cookie = "host_only=1; path=/";
      const setter = jest.spyOn(document, "cookie", "set");

      deleteCookie("host_only");

      expect(setter.mock.calls[0]?.[0]).not.toContain("domain=");
      setter.mockRestore();
      expect(getCookie("host_only")).toBeNull();
    });

    it("dispatches the change event exactly once", () => {
      const listener = jest.fn();
      window.addEventListener(COOKIE_CHANGE_EVENT, listener);

      deleteCookie("anything");

      window.removeEventListener(COOKIE_CHANGE_EVENT, listener);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("deleteAllConsentCookies removes both consent cookies", () => {
      setConsent("analytics", true, 1);
      setConsent("marketing", true, 1);

      deleteAllConsentCookies();

      Object.values(CONSENT_COOKIE_NAMES).forEach((name) => {
        expect(getCookie(name)).toBeNull();
      });
    });
  });

  describe("setConsent revocation", () => {
    it("deletes Google cookies when marketing is refused", () => {
      seed([...GOOGLE_COOKIES, "session_theme"]);

      setConsent("marketing", false, 1);

      expect(visibleNames()).toEqual(
        expect.arrayContaining([
          "session_theme",
          CONSENT_COOKIE_NAMES.marketing,
        ]),
      );
      GOOGLE_COOKIES.forEach((name) => {
        expect(getCookie(name)).toBeNull();
      });
      expect(getConsent("marketing")).toBe(false);
    });

    it("keeps Google cookies when marketing is granted", () => {
      seed(GOOGLE_COOKIES);

      setConsent("marketing", true, 1);

      GOOGLE_COOKIES.forEach((name) => {
        expect(getCookie(name)).toBe("1");
      });
      expect(getConsent("marketing")).toBe(true);
    });

    it.each([true, false])(
      "keeps Google cookies when analytics is set to %s",
      (granted) => {
        seed(GOOGLE_COOKIES);

        setConsent("analytics", granted, 1);

        GOOGLE_COOKIES.forEach((name) => {
          expect(getCookie(name)).toBe("1");
        });
        expect(getConsent("analytics")).toBe(granted);
      },
    );

    it("dispatches the change event once, after the cleanup", () => {
      seed(["_ga"]);
      const seen: (string | null)[] = [];
      const listener = (): void => {
        seen.push(getCookie("_ga"));
      };
      window.addEventListener(COOKIE_CHANGE_EVENT, listener);

      setConsent("marketing", false, 1);

      window.removeEventListener(COOKIE_CHANGE_EVENT, listener);
      expect(seen).toEqual([null]);
    });
  });
});
