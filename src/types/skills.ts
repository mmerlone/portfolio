import type { skills } from "@/data/skills";

export type SkillIconId =
  | "CodeXml"
  | "Server"
  | "Database"
  | "Wrench"
  | "Search"
  | "Scale"
  | "RefreshCw"
  | "BookOpen"
  | "Puzzle"
  | "Compass"
  | "CheckCheck"
  | "ScanSearch"
  | "MessagesSquare"
  | "ShieldCheck"
  | "Lightbulb"
  | "TrendingUp"
  | "Route"
  | "Network";

export interface SkillCatalogEntry {
  readonly name: string;
  readonly variants?: Readonly<Record<string, string>>;
}

export interface HardSkillSelections<Reference> {
  readonly categories: readonly {
    readonly id: string;
    readonly name: string;
    readonly skills: readonly Reference[];
  }[];
  readonly clusters: readonly {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly icon: SkillIconId;
    readonly skills: readonly Reference[];
  }[];
  readonly expertise: readonly {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly keywords: readonly Reference[];
  }[];
}

export interface SoftSkill {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly evidence: string;
  readonly icon: SkillIconId;
}

export type CatalogReference<Catalog> = {
  [Id in keyof Catalog]: { readonly id: Id } & (Catalog[Id] extends {
    readonly variants: infer Variants;
  }
    ? { readonly variant?: keyof Variants }
    : { readonly variant?: never });
}[keyof Catalog];

export type HardSkillId = keyof typeof skills.hard.catalog;
export type SkillReference = CatalogReference<typeof skills.hard.catalog>;

export type HardCategoryId = (typeof skills.hard.categories)[number]["id"];
export type HardClusterId = (typeof skills.hard.clusters)[number]["id"];
export type SoftSkillId = (typeof skills.soft)[number]["id"];

export interface SkillData {
  readonly hard: Omit<
    HardSkillSelections<SkillReference>,
    "categories" | "clusters"
  > & {
    readonly catalog: Readonly<Record<HardSkillId, SkillCatalogEntry>>;
    readonly categories: readonly (HardSkillSelections<SkillReference>["categories"][number] & {
      readonly id: HardCategoryId;
    })[];
    readonly clusters: readonly (HardSkillSelections<SkillReference>["clusters"][number] & {
      readonly id: HardClusterId;
    })[];
  };
  readonly soft: readonly (SoftSkill & { readonly id: SoftSkillId })[];
}
