"use client";

import Section from "@/components/Section";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contributions from "@/components/Contributions";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";
import QuoteSection from "@/components/QuoteSection";
import WidgetsSection from "@/components/WidgetsSection";

// Force dynamic rendering to avoid prerendering issues,
// ensuring cookies are re-read on every request.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      {/*
       */}
      <ClientAnalyticsWrapper />
      <Section>
        <Hero />
      </Section>
      <Section>
        <WidgetsSection />
      </Section>
      <Section>
        <About />
      </Section>
      <Section>
        <Services />
      </Section>
      <Section>
        <QuoteSection />
      </Section>
      <Section>
        <Contributions />
      </Section>
      <Section>
        <Skills />
      </Section>
      <Section>
        <Experience />
      </Section>
      <Section>
        <Credits />
      </Section>
      <Contact />
      <Footer />
      <ScrollToTop />
      {/*
       */}
    </main>
  );
}
