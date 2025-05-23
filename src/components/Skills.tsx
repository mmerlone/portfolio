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
  return (
    <section
      id="skills"
      className={`py-20 relative skills-background ${className}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle>{skillsData.title}</SectionTitle>
        <SkillsWrapper
          categories={skillsData.categories}
          categoryIcons={categoryIcons}
        />
      </div>
    </section>
  );
};

export default Skills;
