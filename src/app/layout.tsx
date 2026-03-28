import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/Navbar";
import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConfigEffectsProvider } from "@/context/ConfigEffectsContext";
import TermsOfServiceToast from "@/components/TermsOfServiceToast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: siteConfig.name + " - " + siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name + " - " + siteConfig.title,
    description: siteConfig.description,
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
    title: siteConfig.name + " - " + siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  // Hardcode the lang attribute to "en-US" to ensure SSR and hydration align
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ConfigEffectsProvider>
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
        </ConfigEffectsProvider>
      </body>
    </html>
  );
}
