import { skills } from "@/data/skills";
import { getSkillLabel, getSkillLabels } from "@/lib/skills";
import type { SkillData, SkillReference } from "@/types/skills";

describe("skill label resolution", () => {
  it("resolves canonical names and declared versions", () => {
    expect(
      getSkillLabels([
        { id: "bash" },
        { id: "node-js" },
        { id: "git" },
        { id: "perl" },
      ]),
    ).toEqual(["Bash", "Node.js", "Git", "Perl"]);
    expect(
      getSkillLabels([
        { id: "react", variant: "v19-plus" },
        { id: "next-js", variant: "v15-plus" },
        { id: "next-js", variant: "v16-plus" },
        { id: "tailwind-css", variant: "v4" },
        { id: "material-ui", variant: "v7-plus" },
      ]),
    ).toEqual([
      "React 19+",
      "Next.js 15+",
      "Next.js 16+",
      "Tailwind CSS 4",
      "Material UI v7+",
    ]);
    expect(getSkillLabel({ id: "shopify-theme" })).toBe("Shopify theme");
    expect(getSkillLabel({ id: "physical-clipboard-and-paper" })).toBe(
      "Physical clipboard and paper",
    );
  });

  it("uses an injectable dataset and fails fast on undeclared variants", () => {
    const fixture: SkillData = {
      ...skills,
      hard: {
        ...skills.hard,
        catalog: { ...skills.hard.catalog, react: { name: "Fixture React" } },
      },
    };
    expect(getSkillLabel({ id: "react" }, fixture)).toBe("Fixture React");
    expect(() =>
      getSkillLabel({ id: "react", variant: "v19-plus" }, fixture),
    ).toThrow("Invalid skill variant");
  });

  it("rejects unknown IDs and variants at the type boundary", () => {
    const valid: SkillReference = { id: "react", variant: "v19-plus" };
    expect(getSkillLabel(valid)).toBe("React 19+");
    type AssertFalse<Value extends false> = Value;
    const invalidId: AssertFalse<
      { id: "made-up" } extends SkillReference ? true : false
    > = false;
    const invalidVariant: AssertFalse<
      { id: "bash"; variant: "v19-plus" } extends SkillReference ? true : false
    > = false;
    expect([invalidId, invalidVariant]).toEqual([false, false]);
  });
});
