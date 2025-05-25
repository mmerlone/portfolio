import Hero from "@/components/Hero";
import About from "@/components/About";
import Contributions from "@/components/Contributions";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";
import { siteConfig } from "@/config/site";

// Force dynamic rendering to avoid prerendering issues,
// ensuring cookies are re-read on every request.
export const dynamic = "force-dynamic";

export default function Home() {
  // This runs on the server, so it's safe to check the key here
  const weatherEnabled = !!siteConfig.weather?.apiKey;

  return (
    <main>
      <ClientAnalyticsWrapper />
      <Hero weatherEnabled={weatherEnabled} />
      <About />
      <Contributions />
      <Skills />
      <Experience />
      <Credits />
      <Contact />
      <ScrollToTop />
      <Footer />
    </main>
  );
}
