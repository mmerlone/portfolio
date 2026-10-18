import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { caseStudies, getCaseStudyHref } from "@/lib/caseStudies";
import { buildLogger } from "@/lib/logger/server";

const logger = buildLogger("sitemap");

// Reflects the last commit date so crawlers see a real freshness signal
// instead of a new timestamp on every build. When Git metadata is missing or
// unusable, lastModified is omitted rather than published as the current date,
// and the build log says so.
function getLastModified(): Date | undefined {
  try {
    const committedAt = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    const lastModified = new Date(committedAt);

    if (!Number.isNaN(lastModified.getTime())) {
      return lastModified;
    }

    logger.warn(
      { committedAt, op: "getLastModified" },
      "Git commit date is empty or invalid; omitting lastModified",
    );
  } catch (error) {
    logger.warn(
      {
        err: error instanceof Error ? error : new Error(String(error)),
        op: "getLastModified",
      },
      "Git commit date unavailable; omitting lastModified",
    );
  }

  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const date = getLastModified();
  const lastModified = date ? { lastModified: date } : {};

  return [
    {
      url: `${siteConfig.url}/`,
      ...lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteConfig.url}${siteConfig.images.profile}`],
    },
    {
      url: `${siteConfig.url}/about`,
      ...lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      ...lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy`,
      ...lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/under-the-hood`,
      ...lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...caseStudies.map((caseStudy) => ({
      url: `${siteConfig.url}${getCaseStudyHref(caseStudy)}`,
      ...lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
