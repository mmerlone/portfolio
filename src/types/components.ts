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

export interface HeroEffectsWrapperProps {
  children: React.ReactNode;
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

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export interface ConfigIconProps<TValue extends string> {
  value?: TValue;
  iconMap: Partial<Record<TValue, React.ElementType>>;
  defaultIconComponent?: React.ElementType;
  size?: number | string;
  className?: string;
  [key: string]: unknown; // For other props passed to the underlying icon
}
