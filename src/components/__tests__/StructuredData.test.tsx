import { render } from "@testing-library/react";
import StructuredData from "@/components/StructuredData";

describe("StructuredData", () => {
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
    expect(data["@graph"].map((entry) => entry["@type"])).toEqual([
      "Person",
      "WebSite",
      "WebPage",
      "WebPage",
      "WebPage",
      "WebPage",
      "WebPage",
      "SoftwareApplication",
      "SoftwareApplication",
      "SoftwareApplication",
      "Article",
    ]);
    expect(data["@graph"].map((entry) => entry["@id"])).toEqual([
      "https://mmerlone.dev.br/#person",
      "https://mmerlone.dev.br/#website",
      "https://mmerlone.dev.br/#webpage",
      "https://mmerlone.dev.br/about#webpage",
      "https://mmerlone.dev.br/contact#webpage",
      "https://mmerlone.dev.br/privacy#webpage",
      "https://mmerlone.dev.br/under-the-hood#webpage",
      "https://mmerlone.dev.br/#work-0",
      "https://mmerlone.dev.br/#work-1",
      "https://mmerlone.dev.br/#work-2",
      "https://mmerlone.dev.br/#work-3",
    ]);
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
    expect(data["@graph"][7]).toEqual(
      expect.objectContaining({
        "@type": "SoftwareApplication",
        name: "YwyBase",
        url: "https://ywybase.vercel.app/",
        codeRepository: "https://github.com/mmerlone/ywybase",
        author: { "@id": "https://mmerlone.dev.br/#person" },
      }),
    );
    expect(data["@graph"][10]).toEqual(
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
