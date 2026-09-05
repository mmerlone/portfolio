import { act, render, screen } from "@testing-library/react";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import { setCookie } from "@/lib/cookies";

jest.mock("@/hooks/useIsHydrated", () => ({
  useIsHydrated: (): boolean => true,
}));

jest.mock("@/config/site", () => ({
  siteConfig: {
    cookie: {
      name: "configured-consent",
    },
    analytics: {
      googleAnalytics: { id: "G-test" },
      googleTagManager: { id: "GTM-test" },
      ahrefs: { key: null },
    },
  },
}));

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
    document.cookie =
      "configured-consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });

  it("loads one Google integration only after configured consent is accepted", () => {
    render(<AnalyticsWrapper />);

    expect(screen.queryByTestId("vercel-analytics")).toBeNull();
    expect(screen.queryByTestId("google-tag-manager")).toBeNull();

    act(() => {
      setCookie("configured-consent", "true", 365);
    });

    expect(screen.getByTestId("vercel-analytics")).not.toBeNull();
    expect(screen.getByTestId("speed-insights")).not.toBeNull();
    expect(screen.getByTestId("google-tag-manager")).not.toBeNull();
    expect(screen.queryByTestId("google-analytics")).toBeNull();
  });

  it("does not load analytics when consent is refused", () => {
    render(<AnalyticsWrapper />);

    act(() => {
      setCookie("configured-consent", "false", 365);
    });

    expect(screen.queryByTestId("vercel-analytics")).toBeNull();
    expect(screen.queryByTestId("google-tag-manager")).toBeNull();
    expect(screen.queryByTestId("google-analytics")).toBeNull();
  });
});
