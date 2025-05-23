import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

async function getGtmId(): Promise<string> {
  // Determine base URL: if VERCEL_URL is available (in production), use it; otherwise fallback to localhost.
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  // Construct the absolute URL.
  const url = `${baseUrl}/api/gtm`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch Google Tag Manager ID");
  }
  const { gtmId } = await res.json();
  return gtmId;
}

export default async function Home() {
  const GOOGLE_TAG_MANAGER_ID = await getGtmId();

  return (
    <main>
      <Analytics />
      <SpeedInsights />
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Credits />
      <Contact />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
