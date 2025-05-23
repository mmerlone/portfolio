import { headers } from "next/headers";
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
  let baseUrl = "";
  if (process.env.VERCEL_URL) {
    // Use VERCEL_URL in production if available
    baseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    // Fallback: get the host from request headers
    const host = (await headers()).get("host") || "localhost:3000";
    baseUrl = `https://${host}`;
  }
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
