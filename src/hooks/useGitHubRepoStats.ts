import { useQuery } from "@tanstack/react-query";
import type { RepoStats } from "@/types/api";

const fetchGitHubRepoStats = async (repoUrl: string): Promise<RepoStats> => {
  if (!repoUrl) {
    throw new Error("Repository URL is not defined.");
  }

  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub repository URL.");
  }
  const [, owner, repo] = match;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({
        message: "Failed to fetch GitHub stats. Unknown error.",
      }));
    throw new Error(errorData.message || "Failed to fetch GitHub stats");
  }
  return response.json();
};

export const useGitHubRepoStats = (repoUrl?: string) => {
  return useQuery<RepoStats, Error>({
    queryKey: ["githubRepoStats", repoUrl],
    queryFn: () => {
      if (!repoUrl) {
        return Promise.reject(new Error("Repository URL is not provided."));
      }
      return fetchGitHubRepoStats(repoUrl);
    },
    enabled: !!repoUrl, // Only run the query if repoUrl is defined
  });
};
