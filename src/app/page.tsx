import { type ReactElement } from "react";
import Hero from "@/components/sections/Hero";
import HowIBuildSection from "@/components/sections/HowIBuildSection";
import HumanOrMachineSection from "@/components/sections/HumanOrMachineSection";
import MyPathSection from "@/components/sections/MyPathSection";
import ChallengesSection from "@/components/sections/ChallengesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home(): ReactElement {
  return (
    <main id="top">
      <Hero />
      <ProjectsSection />
      <HowIBuildSection />
      <HumanOrMachineSection />
      <MyPathSection />
      <ChallengesSection />
      <SkillsSection />
      <ResumeSection />
      <ScrollToTop />
    </main>
  );
}
