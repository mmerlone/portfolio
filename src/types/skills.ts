export interface Skill {
  name: string;
  iconUrl: string;
  level: number;
}

export interface SkillsData {
  title: string;
  categories: Record<string, readonly Skill[]>;
}
