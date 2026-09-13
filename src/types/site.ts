export interface ImagePaths {
  readonly profile: string;
}

export interface NavigationLinkItem {
  readonly label: string;
  /** Shorter text shown in the desktop top-level nav bar; falls back to `label`. */
  readonly shortLabel?: string;
  readonly href: string;
  /** Groups same-page anchors under a desktop dropdown instead of the top-level bar. */
  readonly group?: "sections";
}

export interface NavigationGroupItem {
  readonly label: string;
  readonly group: "case-studies";
  readonly children: readonly NavigationLinkItem[];
}

export type NavigationItem = NavigationLinkItem | NavigationGroupItem;

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
  readonly ahrefs: {
    readonly key: string | null;
  };
}

export interface CTAConfig {
  readonly text: string;
  readonly linkText: string;
  readonly link: string;
}

export interface SeoConfig {
  readonly title: string;
  readonly description: string;
  readonly verification?: {
    readonly google?: string;
    readonly bing?: string;
  };
}

export interface SiteConfig {
  readonly url: string;
  readonly ogImage: string;
  readonly images: ImagePaths;
  readonly navigation: readonly NavigationItem[];
  readonly footer: FooterConfig;
  readonly cookie: CookieConfig;
  readonly analytics?: AnalyticsConfig;
  readonly cta?: CTAConfig;
  readonly seo: SeoConfig;
}
