"use server";

import { parseRepoStats } from "@/lib/apiParsers";
import { type RepoStats } from "@/types/api";

/**
 * Server action to fetch GitHub repository stats.
 * This replaces the deprecated /api/github endpoint.
 */
export async function getGitHubRepoStats(
  repoUrl: string,
): Promise<RepoStats | null> {
  if (!repoUrl) {
    throw new Error("Repository URL is not defined.");
  }

  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) {
    throw new Error("Invalid GitHub repository URL.");
  }

  const [, owner, rawRepo] = match;
  const repo = rawRepo.replace(/\.git$/, "");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();
  return parseRepoStats(payload);
}
