export interface ContactInfo {
  readonly email: string;
  readonly phone: string;
  readonly location: string;
}

export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon?: string;
}

export interface ImagePaths {
  readonly profile: string;
}

export interface NavigationItem {
  readonly name: string;
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

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly headline: string;
  readonly description: string;
  readonly url: string;
  readonly ogImage: string;
  readonly city: string;
  readonly contact: ContactInfo;
  readonly social: readonly SocialLink[];
  readonly images: ImagePaths;
  readonly links: {
    readonly resume: string;
    readonly linktree: string;
  };
  readonly navigation: readonly NavigationItem[];
  readonly footer: FooterConfig;
  readonly cookie: CookieConfig;
  readonly analytics?: AnalyticsConfig;
  readonly weather?: WeatherConfig;
  readonly github?: GitHubConfig;
}
