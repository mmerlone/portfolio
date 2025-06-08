"use client";

import { useState } from "react";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaTools,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import SkillsWrapper from "./SkillsWrapper";
import { skillsData } from "@/data/skills";
import { SkillsProps } from "@/types/components";
import { SectionTitle } from "./ui/SectionTitle";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";
import { cn } from "@/lib/cn";

const categoryIcons = {
  "Frontend Development": <FaCode className="h-6 w-6" />,
  "Backend Development": <FaServer className="h-6 w-6" />,
  Databases: <FaDatabase className="h-6 w-6" />,
  "DevOps & Infrastructure": <FaNetworkWired className="h-6 w-6" />,
  "Web Servers & Services": <FaGlobe className="h-6 w-6" />,
  "Development Tools": <FaTools className="h-6 w-6" />,
  "Leadership & Soft Skills": <FaUsers className="h-6 w-6" />,
} as const;

const Skills = ({ className = "" }: SkillsProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section id="skills" className="relative">
      <BackgroundEffects
        backgrounds={{}}
        className={cn(className, "bg-gray-100/50 dark:bg-gray-950/50")}
      >
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle>{skillsData.title}</SectionTitle>
          <div
            className={cn(
              "relative overflow-hidden transition-[max-height] duration-500 ease-in-out",
              expanded ? "h-auto" : "more-to-show max-h-72"
            )}
          >
            <SkillsWrapper
              categories={skillsData.categories}
              categoryIcons={categoryIcons}
            />
            {!expanded && (
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleToggle}
              aria-expanded={expanded}
              className="rounded text-sm text-blue-600 hover:underline focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-blue-400"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </BackgroundEffects>
    </section>
  );
};

export default Skills;
