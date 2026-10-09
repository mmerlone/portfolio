import { skills } from "@/data/skills";
import { getSkillLabels } from "@/lib/skills";
import type { SkillData } from "@/types/skills";

export function getSeoKeywords(data: SkillData = skills): string[] {
  const { expertise, categories } = data.hard;

  return [
    ...new Set([
      ...expertise.flatMap(({ name, keywords }): string[] => [
        name,
        ...getSkillLabels(keywords, data),
      ]),
      ...categories.flatMap((category): string[] =>
        getSkillLabels(category.skills, data),
      ),
    ]),
  ];
}
