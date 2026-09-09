import { type ReactElement } from "react";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/data/portfolio";
import { getSeoKeywords } from "@/lib/seoKeywords";

const pageUrl = `${siteConfig.url}/`;
const personId = `${pageUrl}#person`;
const websiteId = `${pageUrl}#website`;
const webpageId = `${pageUrl}#webpage`;
const seoKeywords = getSeoKeywords();

const aboutUrl = `${siteConfig.url}/about`;
const contactUrl = `${siteConfig.url}/contact`;
const privacyUrl = `${siteConfig.url}/privacy`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: portfolio.basic.name,
      url: pageUrl,
      image: new URL(siteConfig.images.profile, siteConfig.url).toString(),
      jobTitle: portfolio.basic.title,
      description: siteConfig.seo.description,
      homeLocation: {
        "@type": "Place",
        name: portfolio.basic.location,
      },
      sameAs: portfolio.basic.social?.map(({ url }) => url) ?? [],
      knowsAbout: seoKeywords,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: pageUrl,
      name: portfolio.basic.name,
      description: siteConfig.seo.description,
      inLanguage: "en-US",
      publisher: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: siteConfig.seo.title,
      description: siteConfig.seo.description,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${aboutUrl}#webpage`,
      url: aboutUrl,
      name: `About — ${portfolio.basic.name}`,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${contactUrl}#webpage`,
      url: contactUrl,
      name: `Contact — ${portfolio.basic.name}`,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${privacyUrl}#webpage`,
      url: privacyUrl,
      name: `Privacy Policy — ${portfolio.basic.name}`,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
  ],
};

export default function StructuredData(): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
