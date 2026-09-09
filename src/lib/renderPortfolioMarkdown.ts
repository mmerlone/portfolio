import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import type {
  Portfolio,
  PortfolioChallenge,
  PortfolioEducationItem,
  PortfolioExperienceItem,
  PortfolioProjectItem,
  PortfolioTechnical,
} from "@/types/portfolio";

const TECHNICAL_CATEGORY_LABELS: Record<keyof PortfolioTechnical, string> = {
  programming: "Programming Languages",
  operatingSystems: "Operating Systems",
  hardware: "Hardware",
  serversAndServices: "Servers & Services",
  databases: "Databases",
  platformsAndTools: "Platforms & Tools",
  virtualization: "Virtualization",
  networkingAndSecurity: "Networking & Security",
  backupAndRecovery: "Backup & Recovery",
  cloud: "Cloud",
  automation: "Automation",
  other: "Other",
};

// Escapes emphasis/link/table syntax and neutralizes leading list/heading markers.
function escapeMarkdown(value: string): string {
  const withEscapedInline = value
    .replace(/\\/g, "\\\\")
    .replace(/([`*_[\]<>|])/g, "\\$1");
  return withEscapedInline.replace(/^([#>+*-])/, "\\$1");
}

function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

function heading(level: 1 | 2 | 3, text: string): string {
  return `${"#".repeat(level)} ${escapeMarkdown(text)}`;
}

function mdLink(label: string, url: string): string {
  return `[${escapeMarkdown(label)}](${url})`;
}

function bulletList(items: readonly string[]): string {
  return items.map((item) => `- ${escapeMarkdown(item)}`).join("\n");
}

function nonEmpty(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function renderExperience(item: PortfolioExperienceItem): string {
  const lines: string[] = [heading(3, `${item.company} — ${item.role}`)];

  const meta = [`${item.start} – ${item.end}`, item.location]
    .filter(nonEmpty)
    .join(" · ");
  lines.push(escapeMarkdown(meta));

  if (nonEmpty(item.description)) lines.push(escapeMarkdown(item.description));
  if (item.highlights.length > 0) lines.push(bulletList(item.highlights));
  if (item.technologies && item.technologies.length > 0) {
    lines.push(
      `**Technologies:** ${escapeMarkdown(item.technologies.join(", "))}`,
    );
  }

  return lines.join("\n\n");
}

function renderChallenge(item: PortfolioChallenge): string {
  const lines: string[] = [heading(3, item.title)];

  lines.push(`**Company:** ${escapeMarkdown(item.company)}`);
  lines.push(escapeMarkdown(item.challenge));
  lines.push(`**Actions:**\n\n${bulletList(item.action)}`);
  lines.push(`**Results:**\n\n${bulletList(item.result)}`);
  if (item.technologies.length > 0) {
    lines.push(
      `**Technologies:** ${escapeMarkdown(item.technologies.join(", "))}`,
    );
  }

  return lines.join("\n\n");
}

function renderProject(item: PortfolioProjectItem): string {
  const lines: string[] = [heading(3, item.name)];

  if (nonEmpty(item.description)) lines.push(escapeMarkdown(item.description));
  lines.push(`- ${mdLink("Demo", item.demo)}`);
  lines.push(`- ${mdLink("Source", item.github)}`);
  if (item.technologies.length > 0) {
    lines.push(
      `**Technologies:** ${escapeMarkdown(item.technologies.join(", "))}`,
    );
  }

  return lines.join("\n\n");
}

function renderEducation(item: PortfolioEducationItem): string {
  const lines: string[] = [heading(3, item.institution)];

  const meta = [item.program, item.years].filter(nonEmpty).join(" · ");
  lines.push(escapeMarkdown(meta));
  if (nonEmpty(item.notes)) lines.push(escapeMarkdown(item.notes));

  return lines.join("\n\n");
}

export function renderPortfolioMarkdown(data: Portfolio = portfolio): string {
  const { basic } = data;
  const sections: string[] = [];

  const introLines = [heading(1, basic.name)];
  const tagline = [basic.title, basic.label].filter(nonEmpty).join(" — ");
  if (nonEmpty(tagline)) introLines.push(escapeMarkdown(tagline));
  if (nonEmpty(basic.location)) introLines.push(escapeMarkdown(basic.location));
  sections.push(introLines.join("\n\n"));

  sections.push(
    [heading(2, "Summary"), escapeMarkdown(basic.summary)].join("\n\n"),
  );

  if (basic.expertise.length > 0) {
    sections.push(
      [
        heading(2, "Core Expertise"),
        ...basic.expertise.map((item) =>
          [
            heading(3, item.name),
            escapeMarkdown(item.description),
            item.keywords.length > 0
              ? `**Keywords:** ${escapeMarkdown(item.keywords.join(", "))}`
              : null,
          ]
            .filter((line): line is string => line !== null)
            .join("\n\n"),
        ),
      ].join("\n\n"),
    );
  }

  sections.push(
    [
      heading(2, "Professional Experience"),
      ...data.professionalExperience.map(renderExperience),
    ].join("\n\n"),
  );

  if (data.challenges && data.challenges.length > 0) {
    sections.push(
      [
        heading(2, "Selected Challenges"),
        ...data.challenges.map(renderChallenge),
      ].join("\n\n"),
    );
  }

  if (data.openSourceProjects.length > 0) {
    sections.push(
      [
        heading(2, "Open Source Projects"),
        ...data.openSourceProjects.map(renderProject),
      ].join("\n\n"),
    );
  }

  const technicalCategories = (
    Object.keys(TECHNICAL_CATEGORY_LABELS) as (keyof PortfolioTechnical)[]
  )
    .map((key) => ({ key, values: basic.technical[key] }))
    .filter((category) => category.values.length > 0);
  if (technicalCategories.length > 0) {
    sections.push(
      [
        heading(2, "Technical Skills"),
        ...technicalCategories.map((category) =>
          [
            heading(3, TECHNICAL_CATEGORY_LABELS[category.key]),
            bulletList(category.values),
          ].join("\n\n"),
        ),
      ].join("\n\n"),
    );
  }

  if (data.certifications.length > 0) {
    sections.push(
      [
        heading(2, "Credentials & Certifications"),
        bulletList(data.certifications),
      ].join("\n\n"),
    );
  }

  if (data.education.length > 0) {
    sections.push(
      [heading(2, "Education"), ...data.education.map(renderEducation)].join(
        "\n\n",
      ),
    );
  }

  if (nonEmpty(basic.resume)) {
    sections.push(
      [
        heading(2, "Resume"),
        `- ${mdLink("Download résumé (PDF)", toAbsoluteUrl(basic.resume))}`,
      ].join("\n\n"),
    );
  }

  const repoUrl = siteConfig.github?.repoUrl;
  if (nonEmpty(repoUrl)) {
    sections.push(
      [
        heading(2, "Source Code"),
        `- ${mdLink("View source on GitHub", repoUrl)}`,
      ].join("\n\n"),
    );
  }

  const contactLines: string[] = [];
  if (nonEmpty(basic.contact.email)) {
    contactLines.push(
      `- **Email:** ${mdLink(basic.contact.email, `mailto:${basic.contact.email}`)}`,
    );
  }
  if (nonEmpty(basic.location)) {
    contactLines.push(`- **Location:** ${escapeMarkdown(basic.location)}`);
  }
  if (basic.social && basic.social.length > 0) {
    for (const link of basic.social) {
      contactLines.push(
        `- **${escapeMarkdown(link.name)}:** ${mdLink(link.url, link.url)}`,
      );
    }
  }
  if (contactLines.length > 0) {
    sections.push(
      [heading(2, "Contact"), contactLines.join("\n")].join("\n\n"),
    );
  }

  return `${sections.join("\n\n")}\n`;
}
