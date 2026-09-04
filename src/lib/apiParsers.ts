import type { RepoStats } from "@/types/api";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseRepoStats(payload: unknown): RepoStats {
  if (
    !isRecord(payload) ||
    typeof payload.stargazers_count !== "number" ||
    typeof payload.forks_count !== "number" ||
    typeof payload.watchers_count !== "number" ||
    typeof payload.html_url !== "string"
  ) {
    throw new Error("Invalid GitHub repository response");
  }

  return {
    stargazers_count: payload.stargazers_count,
    forks_count: payload.forks_count,
    watchers_count: payload.watchers_count,
    html_url: payload.html_url,
  };
}
