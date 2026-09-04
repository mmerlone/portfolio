import { getSeoKeywords } from "@/lib/seoKeywords";

describe("getSeoKeywords", () => {
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
