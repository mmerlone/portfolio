import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";

// Force dynamic rendering to avoid prerendering issues,
// ensuring cookies are re-read on every request.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <ClientAnalyticsWrapper />
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
