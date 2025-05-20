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

export interface Skill {
  name: string;
  level: number;
  iconUrl: string;
}

export interface SkillsClientProps {
  categories: Record<string, readonly Skill[]>;
  categoryIcons: Record<string, React.ReactNode>;
} 