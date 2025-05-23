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

async function getGtmId(): Promise<string> {
  // Fetch GTM ID from the API route
  const res = await fetch("http://localhost:3000/api/gtm"); // adjust domain if needed
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
