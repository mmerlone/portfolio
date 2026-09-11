import NextDynamic from "next/dynamic";
import { Suspense, type ReactElement } from "react";
import Hero from "@/components/Hero";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";

// Lazy load complex sections below the fold
const HowIBuildSection = NextDynamic(
  () => import("@/components/HowIBuildSection"),
);
const MyPathSection = NextDynamic(() => import("@/components/MyPathSection"));
const ChallengesSection = NextDynamic(
  () => import("@/components/ChallengesSection"),
);
const ProjectsSection = NextDynamic(
  () => import("@/components/ProjectsSection"),
);
const TechnicalSkillsSection = NextDynamic(
  () => import("@/components/TechnicalSkillsSection"),
);
const ResumeContactSection = NextDynamic(
  () => import("@/components/ResumeContactSection"),
);
const ScrollToTop = NextDynamic(() => import("@/components/ScrollToTop"));

const LoadingSection = (): ReactElement => (
  <div className="border-border bg-surface-muted h-48 w-full border-y" />
);

export default function Home(): ReactElement {
  return (
    <main id="top">
      <ClientAnalyticsWrapper />
      <Hero />
      <Suspense fallback={<LoadingSection />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <HowIBuildSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <MyPathSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ChallengesSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <TechnicalSkillsSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ResumeContactSection />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
}
