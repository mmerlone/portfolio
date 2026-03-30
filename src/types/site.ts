import { type QuoteInterface } from "./api";

export interface ImagePaths {
  readonly profile: string;
}

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface FooterConfig {
  readonly copyright: {
    readonly text: string;
  };
}

export interface CookieConfig {
  readonly name: string;
  readonly expiryDays: number;
}

export interface AnalyticsConfig {
  readonly googleAnalytics: {
    readonly id: string | null;
  };
  readonly googleTagManager: {
    readonly id: string | null;
  };
}

export interface WeatherConfig {
  readonly apiKey: string | null;
}

export interface GitHubConfig {
  readonly repoUrl: string | null;
}

export interface CTAConfig {
  readonly text: string;
  readonly linkText: string;
  readonly link: string;
}

export interface QuoteConfig {
  readonly firstQuote: QuoteInterface;
}

export interface SiteConfig {
  readonly url: string;
  readonly ogImage: string;
  readonly images: ImagePaths;
  readonly navigation: readonly NavigationItem[];
  readonly footer: FooterConfig;
  readonly cookie: CookieConfig;
  readonly analytics?: AnalyticsConfig;
  readonly github?: GitHubConfig;
  readonly cta?: CTAConfig;
}
