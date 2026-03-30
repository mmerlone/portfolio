import NextDynamic from "next/dynamic";
import { Suspense, type ReactElement } from "react";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";
import { apiConfig } from "@/config/api";
import { siteConfig } from "@/config/site";
import {
  getGitHubRepoStatsWidgetData,
  getQuoteWidgetData,
  getWeatherWidgetData,
} from "@/lib/widgetData";

// Lazy load complex sections below the fold
const ExpertiseSection = NextDynamic(() => import("@/components/ExpertiseSection"));
const ExperienceSection = NextDynamic(() => import("@/components/ExperienceSection"));
const ChallengesSection = NextDynamic(() => import("@/components/ChallengesSection"));
const ProjectsSection = NextDynamic(() => import("@/components/ProjectsSection"));
const TechnicalSkillsSection = NextDynamic(() => import("@/components/TechnicalSkillsSection"));
const CredentialsSection = NextDynamic(() => import("@/components/CredentialsSection"));
const EducationSection = NextDynamic(() => import("@/components/EducationSection"));
const Credits = NextDynamic(() => import("@/components/Credits"));
const Contact = NextDynamic(() => import("@/components/Contact"));
const ScrollToTop = NextDynamic(() => import("@/components/ScrollToTop"));
const QuoteSection = NextDynamic(() => import("@/components/QuoteSection"));
const WidgetsSection = NextDynamic(() => import("@/components/WidgetsSection"));

const LoadingSection = (): ReactElement => (
  <div className="h-48 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800/50" />
);

// Force dynamic rendering to avoid prerendering issues,
// ensuring cookies are re-read on every request.
export const dynamic = "force-dynamic";

export default function Home(): ReactElement {
  const repoUrl = siteConfig.github?.repoUrl ?? "";
  const city = apiConfig.openWeather?.city ?? "";
  const repoStatsPromise = repoUrl
    ? getGitHubRepoStatsWidgetData(repoUrl)
    : null;
  const weatherPromise = city ? getWeatherWidgetData(city) : null;
  const quotesPromise = getQuoteWidgetData();

  return (
    <main>
      <ClientAnalyticsWrapper />
      <Section>
        <Hero />
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <WidgetsSection
            repoStatsPromise={repoStatsPromise}
            weatherPromise={weatherPromise}
          />
        </Suspense>
      </Section>
      <Section>
        <AboutSection />
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <ExpertiseSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <QuoteSection quotesPromise={quotesPromise} />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <ExperienceSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <ChallengesSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <ProjectsSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <TechnicalSkillsSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <CredentialsSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <EducationSection />
        </Suspense>
      </Section>
      <Section>
        <Suspense fallback={<LoadingSection />}>
          <Credits />
        </Suspense>
      </Section>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
      <Footer />
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
}
