import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/components/QueryProvider";
import { ReactNode } from "react";
import TermsOfServiceToast from "@/components/TermsOfServiceToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name + " - " + siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Hardcode the lang attribute to "en-US" to ensure SSR and hydration align
  return (
    <html lang="en-US">
      <body className={inter.className} suppressHydrationWarning={true}>
        <QueryProvider>
          <Navbar />
          {children}
          <TermsOfServiceToast />
        </QueryProvider>
      </body>
    </html>
  );
}
