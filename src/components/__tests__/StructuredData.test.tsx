import { render } from "@testing-library/react";
import StructuredData from "@/components/StructuredData";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/`;

/**
 * The `@graph` tail is derived from `openSourceProjects`, because it is a one
 * entry per project mapping. Hardcoding the list here meant adding a project
 * broke this test, so the expectations are computed from the same source the
 * component uses instead of being copied from it.
 */
const webpageIds = [
  `${pageUrl}#webpage`,
  `${siteConfig.url}/about#webpage`,
  `${siteConfig.url}/contact#webpage`,
  `${siteConfig.url}/privacy#webpage`,
  `${siteConfig.url}/under-the-hood#webpage`,
];

const workEntries = portfolio.openSourceProjects.map((item, index) => ({
  "@type": item.kind === "external" ? "Article" : "SoftwareApplication",
  "@id": `${pageUrl}#work-${index}`,
}));

const externalProjectIndex = portfolio.openSourceProjects.findIndex(
  (item) => item.kind === "external",
);

const expectedTypes = [
  "Person",
  "WebSite",
  ...webpageIds.map(() => "WebPage"),
  ...workEntries.map((entry) => entry["@type"]),
];

const expectedIds = [
  `${pageUrl}#person`,
  `${pageUrl}#website`,
  ...webpageIds,
  ...workEntries.map((entry) => entry["@id"]),
];

describe("StructuredData", () => {
  it("derives one work entry per project, of the type its kind requires", () => {
    expect(workEntries).toHaveLength(portfolio.openSourceProjects.length);
    expect(externalProjectIndex).toBeGreaterThanOrEqual(0);
    expect(
      portfolio.openSourceProjects.some((item) => item.kind === "owned"),
    ).toBe(true);
  });

  it("renders a linked Person, WebSite, and WebPage graph", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).not.toBeNull();

    const data = JSON.parse(script?.textContent ?? "") as {
      "@context": string;
      "@graph": {
        "@type": string;
        "@id": string;
        [key: string]: unknown;
      }[];
    };

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"].map((entry) => entry["@type"])).toEqual(
      expectedTypes,
    );
    expect(data["@graph"].map((entry) => entry["@id"])).toEqual(expectedIds);
    expect(data["@graph"][0]).toEqual(
      expect.objectContaining({
        name: "Marcio Merlone",
        url: "https://mmerlone.dev.br/",
        jobTitle: "Senior Software Engineer",
        image: "https://mmerlone.dev.br/images/profile/profile.png",
        sameAs: expect.arrayContaining([
          "https://www.linkedin.com/in/mmerlone",
          "https://github.com/mmerlone",
          "https://mmerlone.dev.br/",
          "https://www.instagram.com/mmerlone/",
          "https://www.facebook.com/mmerlone",
        ]),
        knowsAbout: expect.arrayContaining([
          "High-Performance UI Architecture",
          "Agile",
          "WCAG",
          "Self Hosted Email, DNS, MX, etc.",
        ]),
      }),
    );
    expect(data["@graph"][1]).toEqual(
      expect.objectContaining({
        inLanguage: "en-US",
        publisher: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][2]).toEqual(
      expect.objectContaining({
        isPartOf: { "@id": "https://mmerlone.dev.br/#website" },
        mainEntity: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][3]).toEqual(
      expect.objectContaining({
        url: "https://mmerlone.dev.br/about",
        name: "About — Marcio Merlone",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://mmerlone.dev.br/#website" },
        mainEntity: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][4]).toEqual(
      expect.objectContaining({
        url: "https://mmerlone.dev.br/contact",
        name: "Contact — Marcio Merlone",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://mmerlone.dev.br/#website" },
        mainEntity: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][5]).toEqual(
      expect.objectContaining({
        url: "https://mmerlone.dev.br/privacy",
        name: "Privacy Policy — Marcio Merlone",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://mmerlone.dev.br/#website" },
        mainEntity: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][6]).toEqual(
      expect.objectContaining({
        url: "https://mmerlone.dev.br/under-the-hood",
        name: "Under the Hood — Marcio Merlone",
        inLanguage: "en-US",
        isPartOf: { "@id": "https://mmerlone.dev.br/#website" },
        mainEntity: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    // Located by project rather than by index: the graph offset is fixed, but
    // the position of a given project within `openSourceProjects` is data.
    const ownedIndex = portfolio.openSourceProjects.findIndex(
      (item) => item.name === "YwyBase",
    );
    expect(ownedIndex).toBeGreaterThanOrEqual(0);

    expect(data["@graph"][2 + webpageIds.length + ownedIndex]).toEqual(
      expect.objectContaining({
        "@type": "SoftwareApplication",
        name: "YwyBase",
        url: "https://ywybase.vercel.app/",
        codeRepository: "https://github.com/mmerlone/ywybase",
        author: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );

    const externalEntry =
      data["@graph"][2 + webpageIds.length + externalProjectIndex];
    expect(externalEntry).toEqual(
      expect.objectContaining({
        "@type": "Article",
        name: "Headless CMS Migration: From WordPress to Contentstack",
        url: "https://arctouch.com/blog/headless-cms-migration",
        author: { "@id": "https://mmerlone.dev.br/#person" },
        publisher: {
          "@type": "Organization",
          name: "ArcTouch",
        },
      }),
    );
  });
});
