import { type ReactElement, type ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import TermsOfServiceToast from "@/components/TermsOfServiceToast";

interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: portfolio.basic.name + " - " + portfolio.basic.title,
  description: portfolio.basic.summary,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: portfolio.basic.name + " - " + portfolio.basic.title,
    description: portfolio.basic.summary,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.basic.name + " - " + portfolio.basic.title,
    description: portfolio.basic.summary,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps): ReactElement {
  // Hardcode the lang attribute to "en-US" to ensure SSR and hydration align
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <TermsOfServiceToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
