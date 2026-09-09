import { renderPortfolioMarkdown } from "@/lib/renderPortfolioMarkdown";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import type { Portfolio } from "@/types/portfolio";

function headingLevels(markdown: string): number[] {
  return markdown
    .split("\n")
    .map((line) => /^(#+)\s/.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => match[1].length);
}

describe("renderPortfolioMarkdown", () => {
  const markdown = renderPortfolioMarkdown();
  const lines = markdown.split("\n");

  it("uses the person's name as the sole H1", () => {
    expect(lines[0]).toBe(`# ${portfolio.basic.name}`);
    const h1Count = lines.filter((line) => /^#\s/.test(line)).length;
    expect(h1Count).toBe(1);
  });

  it("never skips a heading level", () => {
    const levels = headingLevels(markdown);
    let maxSeen = 0;
    for (const level of levels) {
      expect(level).toBeLessThanOrEqual(maxSeen + 1);
      maxSeen = Math.max(maxSeen, level);
    }
  });

  it("includes every required section", () => {
    [
      "## Summary",
      "## Core Expertise",
      "## Professional Experience",
      "## Selected Challenges",
      "## Open Source Projects",
      "## Technical Skills",
      "## Credentials & Certifications",
      "## Education",
      "## Resume",
      "## Source Code",
      "## Contact",
    ].forEach((section) => {
      expect(markdown).toContain(section);
    });
  });

  it("uses the canonical absolute URL for internal links", () => {
    expect(markdown).toContain(
      `(${siteConfig.url}/documents/MarcioMerlone.pdf)`,
    );
    const linkTargets = [...markdown.matchAll(/]\(([^)]+)\)/g)].map(
      (match) => match[1],
    );
    for (const target of linkTargets) {
      if (target.startsWith("mailto:")) continue;
      expect(
        target.startsWith("http://") || target.startsWith("https://"),
      ).toBe(true);
    }
  });

  it("does not leak undefined/null/empty-string values", () => {
    expect(markdown).not.toMatch(/\bundefined\b/);
    expect(markdown).not.toMatch(/\bnull\b/);
    expect(markdown).not.toMatch(/^- $/m);
  });

  it("renders a minimal fixture without optional fields", () => {
    const minimalPortfolio: Portfolio = {
      basic: {
        name: "Test Person",
        title: "Engineer",
        location: "Nowhere",
        contact: { email: "test@example.com" },
        summary: "A short summary.",
        technical: {
          programming: [],
          operatingSystems: [],
          hardware: [],
          serversAndServices: [],
          databases: [],
          platformsAndTools: [],
          virtualization: [],
          networkingAndSecurity: [],
          backupAndRecovery: [],
          cloud: [],
          automation: [],
          other: [],
        },
        expertise: [],
      },
      professionalExperience: [],
      openSourceProjects: [],
      education: [],
      languages: [],
      certifications: [],
    };

    const output = renderPortfolioMarkdown(minimalPortfolio);

    expect(output.startsWith("# Test Person")).toBe(true);
    expect(output).not.toMatch(/\bundefined\b/);
    expect(output).not.toMatch(/\bnull\b/);
    expect(output).not.toContain("## Core Expertise");
    expect(output).not.toContain("## Selected Challenges");
    expect(output).not.toContain("## Open Source Projects");
    expect(output).not.toContain("## Technical Skills");
    expect(output).not.toContain("## Credentials & Certifications");
    expect(output).not.toContain("## Education");
    expect(output).not.toContain("## Resume");
    expect(output).toContain("## Contact");
  });

  it("escapes markdown-special characters in the underlying data", () => {
    const specialPortfolio: Portfolio = {
      basic: {
        name: "A*B_C",
        title: "Engineer",
        location: "Nowhere",
        contact: { email: "test@example.com" },
        summary: "Uses [brackets] and `code` and *stars*.",
        technical: {
          programming: [],
          operatingSystems: [],
          hardware: [],
          serversAndServices: [],
          databases: [],
          platformsAndTools: [],
          virtualization: [],
          networkingAndSecurity: [],
          backupAndRecovery: [],
          cloud: [],
          automation: [],
          other: [],
        },
        expertise: [],
      },
      professionalExperience: [],
      openSourceProjects: [],
      education: [],
      languages: [],
      certifications: [],
    };

    const output = renderPortfolioMarkdown(specialPortfolio);

    expect(output.startsWith("# A\\*B\\_C")).toBe(true);
    expect(output).toContain("\\[brackets\\] and \\`code\\` and \\*stars\\*");
  });
});
