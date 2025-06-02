import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import MainPageLayout from "@/components/MainPageLayout";

// Metadata for this specific page, replacing the <Head> component from Layout.tsx
export const metadata: Metadata = {
  title: `Presentation: ${siteConfig.name} - ${siteConfig.title}`,
  description:
    "Interactive presentation about Marcio Merlone's Software Engineering Journey.",
  openGraph: {
    title: `Presentation: ${siteConfig.name} - ${siteConfig.title}`,
    description:
      "Interactive presentation about Marcio Merlone's Software Engineering Journey.",
    url: `${siteConfig.url}/demo/presentation`,
    images: [
      {
        url: siteConfig.ogImage, // Or a more specific image for the presentation
        // width: 1200, // Optional: specify image dimensions
        // height: 630, // Optional: specify image dimensions
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Presentation: ${siteConfig.name} - ${siteConfig.title}`,
    description:
      "Interactive presentation about Marcio Merlone's Software Engineering Journey.",
    images: [siteConfig.ogImage], // Or a more specific image for the presentation
  },
};

// iframeStyle optimized for absolute positioning within a relative flex container
const iframeStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
    border: "none",
  backgroundColor: "transparent",
};

export default function PresentationPage() {
  return (
    <MainPageLayout>
      <div className="flex flex-1 flex-col bg-(--background)">
        <div className="relative flex-1 bg-(--background)">
          <iframe
            src="https://gamma.app/embed/8krf2h2g8iiilp5"
            style={iframeStyle}
            allow="fullscreen"
            title="Marcio Merlone: A Software Engineering Journey"
          ></iframe>
        </div>
      </div>
    </MainPageLayout>
  );
}
