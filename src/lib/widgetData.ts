import { getGitHubRepoStats } from "@/lib/actions/getGitHubRepoStats";
import type { GitHubRepoStatsWidgetData } from "@/types/api";

export async function getGitHubRepoStatsWidgetData(
  repoUrl: string,
): Promise<GitHubRepoStatsWidgetData> {
  try {
    return {
      stats: await getGitHubRepoStats(repoUrl),
      errorMessage: null,
    };
  } catch (error) {
    return {
      stats: null,
      errorMessage:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
