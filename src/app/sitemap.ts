import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Reflects the last commit date so crawlers see a real freshness signal
// instead of a new timestamp on every build.
function getLastModified(): Date {
  try {
    const committedAt = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return committedAt ? new Date(committedAt) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = getLastModified();

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteConfig.url}${siteConfig.images.profile}`],
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
