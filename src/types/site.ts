export interface SiteConfig {
  name: string;
  title: string;
  headline: string;
  description: string;
  url: string;
  ogImage: string;
  city: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
  images: {
    profile: string;
  };
  links: {
    resume: string;
    linktree: string;
  };
  navigation: Array<{
    name: string;
    href: string;
  }>;
  footer: {
    copyright: {
      text: string;
    };
  };
  cookie: {
    name: string;
    expiryDays: number;
  };
}
