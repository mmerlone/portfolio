// RFC 9110 §12.5.1-compatible Accept negotiation, limited to text/html and text/markdown.

type HomepageRepresentation = "html" | "markdown" | "not-acceptable";

interface MediaRange {
  readonly type: string;
  readonly subtype: string;
  readonly q: number;
}

// RFC 9110 token characters (simplified: excludes the DQUOTE/backslash used only in quoted params).
const TOKEN_PATTERN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

function parseMediaRange(rawEntry: string): MediaRange | null {
  const entry = rawEntry.trim();
  if (!entry) return null;

  const parts = entry.split(";").map((part) => part.trim());
  const mediaRangePart = parts[0];
  if (!mediaRangePart) return null;

  const slashIndex = mediaRangePart.indexOf("/");
  if (slashIndex <= 0 || slashIndex === mediaRangePart.length - 1) return null;

  const type = mediaRangePart.slice(0, slashIndex);
  const subtype = mediaRangePart.slice(slashIndex + 1);
  if (!TOKEN_PATTERN.test(type) || !TOKEN_PATTERN.test(subtype)) return null;
  if (type === "*" && subtype !== "*") return null;

  let q = 1;
  for (const param of parts.slice(1)) {
    if (!param) continue;
    const eqIndex = param.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = param.slice(0, eqIndex).trim().toLowerCase();
    if (key !== "q") continue;

    const value = Number(param.slice(eqIndex + 1).trim());
    if (Number.isNaN(value) || value < 0 || value > 1) return null;
    q = value;
  }

  return { type, subtype, q };
}

function parseAcceptHeader(acceptHeader: string | null): MediaRange[] {
  if (!acceptHeader) return [];

  const ranges: MediaRange[] = [];
  for (const rawEntry of acceptHeader.split(",")) {
    const range = parseMediaRange(rawEntry);
    if (range) ranges.push(range);
  }
  return ranges;
}

// Media-range specificity per RFC 9110: exact type/subtype > type/* > */*.
function specificity(range: MediaRange, type: string, subtype: string): number {
  if (range.type === type && range.subtype === subtype) return 3;
  if (range.type === type && range.subtype === "*") return 2;
  if (range.type === "*" && range.subtype === "*") return 1;
  return 0;
}

function resolveQuality(
  ranges: MediaRange[],
  type: string,
  subtype: string,
): number {
  let bestSpecificity = 0;
  let bestQ = 0;

  for (const range of ranges) {
    const currentSpecificity = specificity(range, type, subtype);
    if (currentSpecificity === 0) continue;
    if (
      currentSpecificity > bestSpecificity ||
      (currentSpecificity === bestSpecificity && range.q > bestQ)
    ) {
      bestSpecificity = currentSpecificity;
      bestQ = range.q;
    }
  }

  return bestQ;
}

/**
 * Negotiates between `text/html` and `text/markdown` for the canonical homepage.
 * A missing or fully malformed `Accept` header defaults to `html`. Ties (equal
 * q-values or a wildcard range matching both) resolve to `html` since it is the
 * default representation.
 */
export function negotiateHomepageRepresentation(
  acceptHeader: string | null,
): HomepageRepresentation {
  const ranges = parseAcceptHeader(acceptHeader);
  if (ranges.length === 0) return "html";

  const htmlQuality = resolveQuality(ranges, "text", "html");
  const markdownQuality = resolveQuality(ranges, "text", "markdown");

  if (htmlQuality <= 0 && markdownQuality <= 0) return "not-acceptable";
  return markdownQuality > htmlQuality ? "markdown" : "html";
}
