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

const categoryIcons = {
  "Frontend Development": <FaCode className="w-6 h-6" />,
  "Backend Development": <FaServer className="w-6 h-6" />,
  Databases: <FaDatabase className="w-6 h-6" />,
  "DevOps & Infrastructure": <FaNetworkWired className="w-6 h-6" />,
  "Web Servers & Services": <FaGlobe className="w-6 h-6" />,
  "Development Tools": <FaTools className="w-6 h-6" />,
  "Leadership & Soft Skills": <FaUsers className="w-6 h-6" />,
} as const;

const Skills = ({ className = "" }: SkillsProps) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section
      id="skills"
      className={`py-20 relative skills-background ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>{skillsData.title}</SectionTitle>
        {/* 
          The container is set to relative so that an absolute gradient overlay can be positioned at the bottom when not expanded.
        */}
        <div
          className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            expanded ? "h-auto" : "max-h-72 more-to-show"
          }`}
        >
          <SkillsWrapper
            categories={skillsData.categories}
            categoryIcons={categoryIcons}
          />
          {/* 
            Fading gradient overlay. Adjust the height and colors as needed.
            The overlay is only rendered when the skills are not expanded.
          */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent" />
          )}
        </div>
        <div className="mt-4">
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
