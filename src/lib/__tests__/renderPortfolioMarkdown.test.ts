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
      "## Selected experience",
      "## Selected engineering work",
      "## Technical Skills",
      "## Credentials & Certifications",
      "## Education",
      "## Resume",
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
        roleTitles: [],
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
    expect(output).not.toContain("## Selected experience");
    expect(output).not.toContain("## Selected engineering work");
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
        roleTitles: [],
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

  it("renders owned projects with descriptive links", () => {
    const ownedPortfolio: Portfolio = {
      basic: {
        name: "Test Person",
        title: "Engineer",
        location: "Nowhere",
        contact: { email: "test@example.com" },
        roleTitles: [],
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
      openSourceProjects: [
        {
          kind: "owned",
          slug: "owned-project",
          name: "Owned Project",
          technologies: ["TypeScript"],
          context: "A project context.",
          constraints: ["Keep the API small."],
          decisions: ["Use a typed contract."],
          tradeoffs: ["Favor clarity over flexibility."],
          outcome: "A measured outcome.",
          demo: "https://example.com/demo",
          github: "https://example.com/repo",
          npm: "https://www.npmjs.com/package/owned-project",
          otherLinks: [
            {
              label: "Architecture and design",
              url: "https://example.com/about",
            },
          ],
        },
      ],
      education: [],
      languages: [],
      certifications: [],
    };

    const output = renderPortfolioMarkdown(ownedPortfolio);

    expect(output).toContain("## Selected engineering work");
    expect(output).toContain("### Owned Project");
    expect(output).toContain("**Context:** A project context.");
    expect(output).toContain("**Constraints:**");
    expect(output).toContain("**Decisions:**");
    expect(output).toContain("**Trade-offs:**");
    expect(output).toContain("**Outcome:** A measured outcome.");
    expect(output).toContain("[Live demo](https://example.com/demo)");
    expect(output).toContain("[GitHub](https://example.com/repo)");
    expect(output).toContain(
      "[npm](https://www.npmjs.com/package/owned-project)",
    );
    expect(output).toContain(
      "[Architecture and design](https://example.com/about)",
    );
  });

  it("renders external articles with publisher and author attribution", () => {
    const externalPortfolio: Portfolio = {
      basic: {
        name: "Test Person",
        title: "Engineer",
        location: "Nowhere",
        contact: { email: "test@example.com" },
        roleTitles: [],
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
      openSourceProjects: [
        {
          kind: "external",
          slug: "headless-cms-migration",
          name: "Headless CMS Migration: From WordPress to Contentstack",
          publisher: "ArcTouch",
          author: "Marcio Merlone",
          articleUrl: "https://arctouch.com/blog/headless-cms-migration",
          authorProfileUrl: "https://arctouch.com/blog/author/marcio-merlone",
        },
      ],
      education: [],
      languages: [],
      certifications: [],
    };

    const output = renderPortfolioMarkdown(externalPortfolio);

    expect(output).toContain(
      "### Headless CMS Migration: From WordPress to Contentstack",
    );
    expect(output).toContain("**Publisher:** ArcTouch");
    expect(output).toContain("**Author:** Marcio Merlone");
    expect(output).toContain(
      "[Read the article](https://arctouch.com/blog/headless-cms-migration)",
    );
    expect(output).toContain(
      "[ArcTouch author profile](https://arctouch.com/blog/author/marcio-merlone)",
    );
    expect(output).not.toContain("[GitHub]");
    expect(output).not.toContain("[npm]");
  });
});
