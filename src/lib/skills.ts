import { skills } from "@/data/skills";
import type { SkillData, SkillReference } from "@/types/skills";

export function getSkillLabel(
  reference: SkillReference,
  data: SkillData = skills,
): string {
  const entry = data.hard.catalog[reference.id];
  if (reference.variant === undefined) return entry.name;
  const label = entry.variants?.[reference.variant];
  if (label === undefined) {
    throw new Error(
      `Invalid skill variant: ${reference.id}/${reference.variant}`,
    );
  }
  return label;
}

export function getSkillLabels(
  references: readonly SkillReference[],
  data: SkillData = skills,
): string[] {
  return references.map((reference): string => getSkillLabel(reference, data));
}
