import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
import { challenges } from "@/data/challenges";
import { pathStages } from "@/data/pathStages";
import { getSkillLabels } from "@/lib/skills";
import { skillIcons } from "@/lib/skillIcons";
import baseline from "./fixtures/skillsBaseline.json";
import type { SkillReference } from "@/types/skills";

const aliases: Readonly<Record<string, string>> = {
  bash: "Bash",
  PERL: "Perl",
  GIT: "Git",
  node: "Node.js",
  jest: "Jest",
  Tailwind: "Tailwind CSS",
  TailwindCSS: "Tailwind CSS",
  MUI: "Material UI",
};

function normalized(labels: readonly string[]): string[] {
  return [...new Set(labels.map((label): string => aliases[label] ?? label))];
}

function verifyReferences(references: readonly SkillReference[]): void {
  expect(
    new Set(references.map((ref): string => JSON.stringify(ref))).size,
  ).toBe(references.length);
  for (const ref of references) {
    expect(skills.hard.catalog).toHaveProperty(ref.id);
  }
  expect(
    getSkillLabels(references).every((label): boolean => label.length > 0),
  ).toBe(true);
}

describe("consolidated skills source preservation", () => {
  it("retains all ordered category selections and keeps context-only entries out", () => {
    expect(Object.keys(skills)).toEqual(["hard", "soft"]);
    expect(Object.keys(skills.hard.catalog)).toHaveLength(187);
    expect(
      skills.hard.categories.map((item): number => item.skills.length),
    ).toEqual([9, 5, 9, 30, 5, 5, 3, 16, 4, 2, 3, 3]);
    expect(skills.hard.categories.map((item): string => item.id)).toEqual(
      Object.keys(baseline.categories),
    );
    for (const [index, labels] of Object.values(
      baseline.categories,
    ).entries()) {
      const category = skills.hard.categories[index];
      expect(category).toBeDefined();
      verifyReferences(category.skills);
      expect(getSkillLabels(category.skills)).toEqual(normalized(labels));
    }
    expect(
      skills.hard.categories.flatMap((item): string[] =>
        getSkillLabels(item.skills),
      ),
    ).not.toContain("Physical clipboard and paper");
  });

  it("preserves cluster copy, overlap, first-order deduplication, and icons", () => {
    expect(
      skills.hard.clusters.map((item): number => item.skills.length),
    ).toEqual([12, 68, 7, 7]);
    for (const [index, original] of baseline.clusters.entries()) {
      const cluster = skills.hard.clusters[index];
      expect(cluster.title).toBe(original.title);
      expect(cluster.description).toBe(original.description);
      expect(getSkillLabels(cluster.skills)).toEqual(
        normalized(original.skills),
      );
      verifyReferences(cluster.skills);
      expect(skillIcons[cluster.icon]).toBeDefined();
    }
    expect(getSkillLabels(skills.hard.clusters[0].skills)).toContain("SOGo");
    expect(getSkillLabels(skills.hard.clusters[2].skills)).toContain("SOGo");
  });

  it("preserves expertise narratives and all soft content and assignments", () => {
    expect(
      skills.hard.expertise.map((item): number => item.keywords.length),
    ).toEqual([17, 17, 17]);
    for (const [index, original] of baseline.expertise.entries()) {
      const expertise = skills.hard.expertise[index];
      expect(expertise.name).toBe(original.name);
      expect(expertise.description).toBe(original.description);
      expect(getSkillLabels(expertise.keywords)).toEqual(
        normalized(original.keywords),
      );
      verifyReferences(expertise.keywords);
    }
    expect(skills.soft).toHaveLength(14);
    expect(
      skills.soft.map(({ icon, ...item }) => {
        expect(skillIcons[icon]).toBeDefined();
        return item;
      }),
    ).toEqual(baseline.soft);
    expect(new Set(skills.soft.map((item): string => item.id)).size).toBe(14);
    expect(JSON.parse(JSON.stringify(skills))).toEqual(skills);
    expect(Object.keys(skillIcons)).toHaveLength(18);
    expect(skills.hard.clusters.map((item): string => item.icon)).toEqual([
      "CodeXml",
      "Server",
      "Database",
      "Wrench",
    ]);
    expect(skills.soft.map((item): string => item.icon)).toEqual([
      "Search",
      "Scale",
      "RefreshCw",
      "BookOpen",
      "Puzzle",
      "Compass",
      "CheckCheck",
      "ScanSearch",
      "MessagesSquare",
      "ShieldCheck",
      "Lightbulb",
      "TrendingUp",
      "Route",
      "Network",
    ]);
  });

  it("retains every contextual list, including versions and legacy tools", () => {
    const contexts = { projects, experiences, challenges, pathStages };
    for (const key of [
      "projects",
      "experiences",
      "challenges",
      "pathStages",
    ] as const) {
      const original = baseline.contexts[key];
      expect(contexts[key]).toHaveLength(original.length);
      for (const [index, item] of contexts[key].entries()) {
        const labels = original[index];
        expect(
          item.technologies ? getSkillLabels(item.technologies) : null,
        ).toEqual(labels ? normalized(labels) : null);
        if (item.technologies) verifyReferences(item.technologies);
      }
    }
  });
});
