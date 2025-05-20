export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
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
    social: Array<{
      name: string;
      href: string;
      icon: string;
    }>;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
} 