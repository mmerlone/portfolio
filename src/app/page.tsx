import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Credits from '@/components/Credits';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;
  return (
    <main>
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
