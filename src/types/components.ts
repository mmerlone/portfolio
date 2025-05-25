import type { Skill } from "@/types/skills";

export interface AboutProps {
  className?: string;
}

export interface ContactProps {
  className?: string;
}

export interface ExperienceProps {
  className?: string;
}

export interface HeroProps {
  className?: string;
  weatherEnabled: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export interface ScrollToTopProps {
  className?: string;
}

export interface SkillsProps {
  className?: string;
}

export interface SkillsWrapperProps {
  categories: Record<string, readonly Skill[]>;
  categoryIcons: Record<string, React.ReactNode>;
}
