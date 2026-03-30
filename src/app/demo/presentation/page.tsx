import { Suspense, type CSSProperties, type ReactElement } from "react";
import { type Metadata } from "next";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Metadata for this specific page, replacing the <Head> component from Layout.tsx
export const metadata: Metadata = {
  title: `Presentation: ${portfolio.basic.name} - ${portfolio.basic.title}`,
  description:
    "Interactive presentation about Marcio Merlone's Software Engineering Journey.",
  openGraph: {
    title: `Presentation: ${portfolio.basic.name} - ${portfolio.basic.title}`,
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
    title: `Presentation: ${portfolio.basic.name} - ${portfolio.basic.title}`,
    description:
      "Interactive presentation about Marcio Merlone's Software Engineering Journey.",
    images: [siteConfig.ogImage], // Or a more specific image for the presentation
  },
};

// iframeStyle optimized for absolute positioning within a relative flex container
const iframeStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  border: "none",
  backgroundColor: "transparent",
};

export default function PresentationPage(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col pt-16">
        <main className="flex flex-1 flex-col">
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
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  );
}
