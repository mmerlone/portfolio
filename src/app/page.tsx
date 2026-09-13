import NextDynamic from "next/dynamic";
import { Suspense, type ReactElement } from "react";
import Hero from "@/components/sections/Hero";
import ClientAnalyticsWrapper from "@/components/ClientAnalyticsWrapper";

// Lazy load complex sections below the fold
const HowIBuildSection = NextDynamic(
  () => import("@/components/sections/HowIBuildSection"),
);
const MyPathSection = NextDynamic(() => import("@/components/sections/MyPathSection"));
const ChallengesSection = NextDynamic(
  () => import("@/components/sections/ChallengesSection"),
);
const ProjectsSection = NextDynamic(
  () => import("@/components/sections/ProjectsSection"),
);
const TechnicalSkillsSection = NextDynamic(
  () => import("@/components/sections/TechnicalSkillsSection"),
);
const ResumeSection = NextDynamic(() => import("@/components/sections/ResumeSection"));
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
        <ResumeSection />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
}
