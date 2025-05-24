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
import { fetchGtmId } from "@/lib/gtm";

// Force dynamic rendering to avoid prerendering issues
export const dynamic = "force-dynamic";

export default async function Home() {
  let GOOGLE_TAG_MANAGER_ID = "";
  try {
    GOOGLE_TAG_MANAGER_ID = await fetchGtmId();
  } catch (error: unknown) {
    // handle or log the error accordingly
    // For production, you might show fallback UI or simply omit GTM
    console.error("Error fetching GTM ID:", error);
  }

  return (
    <main>
      <Analytics />
      <SpeedInsights />
      {GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      )}
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
