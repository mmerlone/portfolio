import { useQuery } from "@tanstack/react-query";
import type { RepoStats } from "@/types/api";

const fetchGitHubRepoStats = async (repoUrl: string): Promise<RepoStats> => {
  if (!repoUrl) {
    throw new Error("Repository URL is not defined.");
  }

  const response = await fetch(
    `/api/github?repoUrl=${encodeURIComponent(repoUrl)}`,
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: "Failed to fetch GitHub stats. Unknown error.",
    }));
    throw new Error(
      errorData.error || errorData.message || "Failed to fetch GitHub stats",
    );
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
    enabled: !!repoUrl,
  });
};
