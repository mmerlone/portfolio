import type {
  GitHubRepoStatsWidgetData,
  QuoteInterface,
  WeatherWidgetData,
} from "@/types/api";
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
}

export interface QuoteProps {
  className?: string;
  quotesPromise: Promise<QuoteInterface[]>;
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

export interface WidgetsSectionProps {
  className?: string;
  repoStatsPromise: Promise<GitHubRepoStatsWidgetData> | null;
  weatherPromise: Promise<WeatherWidgetData> | null;
}

export interface SkillsWrapperProps {
  categories: Record<string, readonly Skill[]>;
  categoryIcons: Record<string, React.ReactNode>;
}

export interface EffectConditionalWrapperProps {
  children: React.ReactNode;
}

export interface IconProps {
  size?: number | string;
  className?: string;
}

export interface Tab {
  title: string;
  label: string;
  labelSelected?: string;
  icon: React.ElementType<IconProps>;
  type?: never;
  component?: React.ReactNode;
}

export interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

export type TabItem = Tab | Separator;

export interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

export interface ConfigIconProps<TValue extends string> {
  value?: TValue;
  iconMap: Partial<Record<TValue, React.ElementType>>;
  defaultIconComponent?: React.ElementType;
  size?: number | string;
  className?: string;
  [key: string]: unknown; // For other props passed to the underlying icon
}
