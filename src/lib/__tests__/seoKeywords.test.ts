import { getSeoKeywords } from "@/lib/seoKeywords";
import { skills } from "@/data/skills";
import baseline from "@/data/__tests__/fixtures/skillsBaseline.json";

describe("getSeoKeywords", () => {
  it("preserves the normalized source order without promoting catalog-only entries", (): void => {
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
    expect(getSeoKeywords()).toEqual([
      ...new Set(baseline.seo.map((label): string => aliases[label] ?? label)),
    ]);
    for (const label of [
      "Physical clipboard and paper",
      "Material UI v7+",
      "Next.js 16+",
    ]) {
      expect(getSeoKeywords()).not.toContain(label);
    }
    expect(
      getSeoKeywords({
        ...skills,
        hard: { ...skills.hard, categories: [], clusters: [], expertise: [] },
      }),
    ).toEqual([]);
  });
  it("returns deduplicated expertise names and their keywords", () => {
    const keywords = getSeoKeywords();

    expect(keywords).toEqual(
      expect.arrayContaining([
        "High-Performance UI Architecture",
        "React",
        "Agile",
        "WCAG",
        "Self Hosted Email, DNS, MX, etc.",
        "PostgreSQL",
        "Bacula",
        "Azure",
      ]),
    );
    expect(keywords.filter((keyword) => keyword === "Docker")).toHaveLength(1);
    expect(keywords.filter((keyword) => keyword === "Networking")).toHaveLength(
      1,
    );
  });
});
