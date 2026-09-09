import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";

const LLMS_TXT_PATH = path.join(process.cwd(), "public", "llms.txt");

// Local paths this repo actually serves; keep in sync with routes/public assets.
const EXISTING_LOCAL_PATHS = new Set([
  "/",
  "/index.md",
  "/about",
  "/contact",
  "/privacy",
]);

function isExistingLocalPath(pathname: string): boolean {
  if (EXISTING_LOCAL_PATHS.has(pathname)) return true;
  return existsSync(path.join(process.cwd(), "public", pathname));
}

interface LinkListItem {
  readonly text: string;
  readonly url: string;
}

function extractListLinks(lines: readonly string[]): LinkListItem[] {
  const linkPattern = /^-\s+\[([^\]]+)\]\(([^)]+)\)/;
  return lines
    .map((line) => linkPattern.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({ text: match[1], url: match[2] }));
}

describe("public/llms.txt", () => {
  const content = readFileSync(LLMS_TXT_PATH, "utf8");
  const lines = content.split("\n");

  it("has exactly one H1", () => {
    const h1Lines = lines.filter((line) => /^#\s+/.test(line));
    expect(h1Lines).toHaveLength(1);
  });

  it("orders the H1 before the blockquote, and the blockquote before any H2", () => {
    const h1Index = lines.findIndex((line) => /^#\s+/.test(line));
    const blockquoteIndex = lines.findIndex((line) => /^>\s*/.test(line));
    const firstH2Index = lines.findIndex((line) => /^##\s+/.test(line));

    expect(h1Index).toBeGreaterThanOrEqual(0);
    expect(blockquoteIndex).toBeGreaterThan(h1Index);
    expect(firstH2Index).toBeGreaterThan(blockquoteIndex);
  });

  it("has no heading between the blockquote and the first H2 section", () => {
    const blockquoteIndex = lines.findIndex((line) => /^>\s*/.test(line));
    const firstH2Index = lines.findIndex((line) => /^##\s+/.test(line));
    const between = lines.slice(blockquoteIndex + 1, firstH2Index);

    expect(between.some((line) => /^#{1,6}\s+/.test(line))).toBe(false);
  });

  it("includes specific, non-generic when-to-use guidance", () => {
    expect(content).toContain(
      "evaluate Marcio Merlone's professional background and experience for a role",
    );
    expect(content).toContain(
      "match platform/reliability/frontend expertise against a job requirement",
    );
    expect(content).toContain("locate résumé or project evidence");
    expect(content).toContain("find official contact channels");
    expect(content).toContain("no public API, CLI, or MCP server");
    expect(content).toContain("wildcard-DNS artifact");
  });

  it("has only valid Markdown links in its H2 file-list sections, using real absolute URLs", () => {
    const links = extractListLinks(lines);
    expect(links.length).toBeGreaterThan(0);

    for (const { url } of links) {
      expect(url === "" || /\s/.test(url)).toBe(false);

      if (url.startsWith(siteConfig.url)) {
        const localPath = url.slice(siteConfig.url.length) || "/";
        expect(isExistingLocalPath(localPath)).toBe(true);
        continue;
      }

      expect(() => new URL(url)).not.toThrow();
      const parsed = new URL(url);
      expect(parsed.protocol).toBe("https:");
    }
  });

  it("does not link to routes that don't exist in this repo", () => {
    const links = extractListLinks(lines);
    const nonexistentRoutes = ["/developers"];

    for (const { url } of links) {
      for (const route of nonexistentRoutes) {
        expect(url).not.toBe(`${siteConfig.url}${route}`);
      }
    }
  });
});
