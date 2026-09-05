import { type ReactElement, type ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import TermsOfServiceToast from "@/components/TermsOfServiceToast";
import StructuredData from "@/components/StructuredData";
import { getSeoKeywords } from "@/lib/seoKeywords";

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const seoKeywords = getSeoKeywords();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: portfolio.basic.name, url: siteConfig.url }],
  creator: portfolio.basic.name,
  publisher: portfolio.basic.name,
  applicationName: portfolio.basic.name,
  appleWebApp: {
    capable: true,
    title: portfolio.basic.name,
    statusBarStyle: "default",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    siteName: portfolio.basic.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.seo.title }],
  },
  ...(siteConfig.seo.verification
    ? {
        verification: {
          ...(siteConfig.seo.verification.google
            ? { google: siteConfig.seo.verification.google }
            : {}),
          ...(siteConfig.seo.verification.bing
            ? {
                other: {
                  "msvalidate.01": siteConfig.seo.verification.bing,
                },
              }
            : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({ children }: LayoutProps): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <a href="#top" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgressBar />
          <Navbar />
          {children}
          <TermsOfServiceToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
