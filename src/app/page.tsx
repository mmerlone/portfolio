import NextDynamic from "next/dynamic";
import { Suspense, type ReactElement } from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";
import GitHubWidgetSection from "@/components/GitHubWidgetSection";
import { siteConfig } from "@/config/site";
import { getGitHubRepoStatsWidgetData } from "@/lib/widgetData";

// Lazy load complex sections below the fold
const ExpertiseSection = NextDynamic(
  () => import("@/components/ExpertiseSection"),
);
const ExperienceSection = NextDynamic(
  () => import("@/components/ExperienceSection"),
);
const ChallengesSection = NextDynamic(
  () => import("@/components/ChallengesSection"),
);
const ProjectsSection = NextDynamic(
  () => import("@/components/ProjectsSection"),
);
const TechnicalSkillsSection = NextDynamic(
  () => import("@/components/TechnicalSkillsSection"),
);
const CredentialsSection = NextDynamic(
  () => import("@/components/CredentialsSection"),
);
const EducationSection = NextDynamic(
  () => import("@/components/EducationSection"),
);
const Credits = NextDynamic(() => import("@/components/Credits"));
const Contact = NextDynamic(() => import("@/components/Contact"));
const ScrollToTop = NextDynamic(() => import("@/components/ScrollToTop"));

const LoadingSection = (): ReactElement => (
  <div className="border-border bg-surface-muted h-48 w-full border-y" />
);

// Force dynamic rendering to avoid prerendering issues,
// ensuring cookies are re-read on every request.
export const dynamic = "force-dynamic";

export default function Home(): ReactElement {
  const repoUrl = siteConfig.github?.repoUrl ?? "";
  const repoStatsPromise = repoUrl
    ? getGitHubRepoStatsWidgetData(repoUrl)
    : null;

  return (
    <main id="top">
      <ClientAnalyticsWrapper />
      <Hero />
      <AboutSection />
      {repoStatsPromise ? (
        <Suspense fallback={<LoadingSection />}>
          <GitHubWidgetSection repoStatsPromise={repoStatsPromise} />
        </Suspense>
      ) : null}
      <Suspense fallback={<LoadingSection />}>
        <ExpertiseSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ChallengesSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <TechnicalSkillsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <CredentialsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <EducationSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Credits />
      </Suspense>
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
