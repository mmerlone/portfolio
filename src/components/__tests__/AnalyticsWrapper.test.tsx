import { act, render, screen } from "@testing-library/react";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import { creditsData } from "@/data/credits";
import {
  COOKIE_CHANGE_EVENT,
  deleteAllConsentCookies,
  setConsent,
} from "@/lib/cookies";

jest.mock("@/hooks/useIsHydrated", () => ({
  useIsHydrated: (): boolean => true,
}));

interface MockTracking {
  analyticsConfig: {
    googleAnalytics: { id: string | null };
    googleTagManager: { id: string | null };
    ahrefs: { key: string | null };
  };
}

jest.mock("@/config/tracking", () => ({
  analyticsConfig: {
    googleAnalytics: { id: "G-test" },
    googleTagManager: { id: "GTM-test" },
    ahrefs: { key: null },
  },
}));

const trackingConfig =
  jest.requireMock<MockTracking>("@/config/tracking").analyticsConfig;

const configureTracking = ({
  gtm,
  ga,
  ahrefs,
}: {
  gtm: string | null;
  ga: string | null;
  ahrefs: string | null;
}): void => {
  trackingConfig.googleTagManager.id = gtm;
  trackingConfig.googleAnalytics.id = ga;
  trackingConfig.ahrefs.key = ahrefs;
};

jest.mock("@vercel/analytics/react", () => ({
  Analytics: (): React.JSX.Element => <div data-testid="vercel-analytics" />,
}));

jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: (): React.JSX.Element => <div data-testid="speed-insights" />,
}));

jest.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: (): React.JSX.Element => (
    <div data-testid="google-analytics" />
  ),
  GoogleTagManager: (): React.JSX.Element => (
    <div data-testid="google-tag-manager" />
  ),
}));

describe("AnalyticsWrapper", () => {
  beforeEach(() => {
    act(() => {
      deleteAllConsentCookies();
    });
  });

  it("loads one Google integration only after configured consent is accepted", () => {
    render(<AnalyticsWrapper />);

    expect(screen.queryByTestId("vercel-analytics")).toBeNull();
    expect(screen.queryByTestId("google-tag-manager")).toBeNull();

    act(() => {
      setConsent("analytics", true, 365);
      setConsent("marketing", true, 365);
    });

    expect(screen.getByTestId("vercel-analytics")).not.toBeNull();
    expect(screen.getByTestId("speed-insights")).not.toBeNull();
    expect(screen.getByTestId("google-tag-manager")).not.toBeNull();
    expect(screen.queryByTestId("google-analytics")).toBeNull();
  });

  it("does not load analytics when consent is refused", () => {
    render(<AnalyticsWrapper />);

    act(() => {
      setConsent("analytics", false, 365);
      setConsent("marketing", false, 365);
    });

    expect(screen.queryByTestId("vercel-analytics")).toBeNull();
    expect(screen.queryByTestId("google-tag-manager")).toBeNull();
    expect(screen.queryByTestId("google-analytics")).toBeNull();
  });
});

describe("AnalyticsWrapper consent revocation", () => {
  // jsdom cannot stub window.location.reload (it is unforgeable), but it
  // reports every real reload as a "not implemented: navigation" error.
  let errorSpy: jest.SpyInstance;
  const reloadCount = (): number =>
    errorSpy.mock.calls.filter((args: unknown[]) =>
      String(args[0]).includes("Not implemented: navigation"),
    ).length;

  const grantAll = async (): Promise<void> => {
    await act(async () => {
      setConsent("analytics", true, 365);
      setConsent("marketing", true, 365);
      await Promise.resolve();
    });
  };

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    configureTracking({ gtm: "GTM-test", ga: "G-test", ahrefs: null });
    act(() => {
      deleteAllConsentCookies();
    });
    Reflect.deleteProperty(window, "ga-disable-G-test");
    Reflect.deleteProperty(window, "gtag");
    window.dataLayer = [];
  });

  afterEach(() => {
    errorSpy.mockRestore();
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie =
      "_ga_TEST=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });

  it("reloads once when marketing is revoked and denies Google consent through GTM", async () => {
    const gtag = jest.fn();
    window.gtag = gtag;
    document.cookie = "_ga=GA1.1.1; path=/";
    document.cookie = "_ga_TEST=GS1.1.1; path=/";
    render(<AnalyticsWrapper />);
    await grantAll();
    expect(reloadCount()).toBe(0);

    await act(async () => {
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(1);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    expect(Reflect.get(window, "ga-disable-G-test")).toBeUndefined();
    expect(document.cookie).not.toContain("_ga");
  });

  it("sets the GA disable flag when only Google Analytics is configured", async () => {
    configureTracking({ gtm: null, ga: "G-test", ahrefs: null });
    document.cookie = "_ga=GA1.1.1; path=/";
    render(<AnalyticsWrapper />);
    await grantAll();
    expect(screen.getByTestId("google-analytics")).not.toBeNull();

    await act(async () => {
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });

    expect(Reflect.get(window, "ga-disable-G-test")).toBe(true);
    expect(document.cookie).not.toContain("_ga");
    expect(reloadCount()).toBe(1);
  });

  it("reloads once when analytics is revoked without touching Google", async () => {
    const gtag = jest.fn();
    window.gtag = gtag;
    render(<AnalyticsWrapper />);
    await grantAll();

    await act(async () => {
      setConsent("analytics", false, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(1);
    expect(gtag).not.toHaveBeenCalled();
    expect(Reflect.get(window, "ga-disable-G-test")).toBeUndefined();
  });

  it("reloads a single time when both categories are revoked together", async () => {
    window.gtag = jest.fn();
    render(<AnalyticsWrapper />);
    await grantAll();

    await act(async () => {
      setConsent("analytics", false, 365);
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(1);
  });

  it("does not reload for an unchanged re-read of the consent cookies", async () => {
    render(<AnalyticsWrapper />);
    await grantAll();

    await act(async () => {
      window.dispatchEvent(new Event(COOKIE_CHANGE_EVENT));
      setConsent("analytics", true, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(0);
  });

  it.each([
    ["refused", "refused"],
    ["unknown", null],
  ])(
    "does not reload on mount with %s consent",
    async (_label: string, value: string | null) => {
      if (value) {
        act(() => {
          setConsent("analytics", false, 365);
          setConsent("marketing", false, 365);
        });
      }

      render(<AnalyticsWrapper />);
      await act(async () => {
        await Promise.resolve();
      });

      expect(reloadCount()).toBe(0);
    },
  );

  it("does not reload on mount with consent that was already granted", async () => {
    act(() => {
      setConsent("analytics", true, 365);
      setConsent("marketing", true, 365);
    });

    render(<AnalyticsWrapper />);
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByTestId("vercel-analytics")).not.toBeNull();
    expect(reloadCount()).toBe(0);
  });

  it("does not reload when consent is granted", async () => {
    render(<AnalyticsWrapper />);
    await act(async () => {
      setConsent("analytics", false, 365);
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });
    await grantAll();

    expect(reloadCount()).toBe(0);
  });

  it("does not reload when revoking marketing and no marketing tracker is configured", async () => {
    configureTracking({ gtm: null, ga: null, ahrefs: null });
    render(<AnalyticsWrapper />);
    await grantAll();

    await act(async () => {
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(0);
  });

  it("reloads when marketing is revoked and only Ahrefs is configured", async () => {
    configureTracking({ gtm: null, ga: null, ahrefs: "ahrefs-key" });
    render(<AnalyticsWrapper />);
    await grantAll();

    await act(async () => {
      setConsent("marketing", false, 365);
      await Promise.resolve();
    });

    expect(reloadCount()).toBe(1);
  });
});

describe("AnalyticsWrapper disclosure", () => {
  // Every processor conditionally rendered in AnalyticsWrapper must be disclosed in the Credits data.
  const disclosedProcessors = [
    "Vercel",
    "Vercel Speed Insights",
    "Google Analytics",
    "Google Tag Manager",
    "Ahrefs Analytics",
  ];

  it.each(disclosedProcessors)(
    "has a credits entry for %s",
    (name: string): void => {
      expect(creditsData.some((credit) => credit.name === name)).toBe(true);
    },
  );
});
