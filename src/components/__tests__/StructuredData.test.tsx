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
    ]);
    expect(data["@graph"].map((entry) => entry["@id"])).toEqual([
      "https://mmerlone.dev.br/#person",
      "https://mmerlone.dev.br/#website",
      "https://mmerlone.dev.br/#webpage",
    ]);
    expect(data["@graph"][0]).toEqual(
      expect.objectContaining({
        name: "Marcio Merlone",
        url: "https://mmerlone.dev.br/",
        jobTitle: "Software Engineer",
        image: "https://mmerlone.dev.br/images/profile/profile.png",
        sameAs: expect.arrayContaining([
          "https://www.linkedin.com/in/mmerlone",
          "https://github.com/mmerlone",
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
  });
});
