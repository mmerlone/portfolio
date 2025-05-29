"use client";

import { useEffect, useState } from "react";
import type { RepoStats } from "@/types/api";
import { siteConfig } from "@/config/site";
import { FaStar, FaCodeBranch, FaEye, FaGithub } from "react-icons/fa";

export default function GitHubRepoStats() {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repoUrl = siteConfig.github?.repoUrl;

  useEffect(() => {
    if (!repoUrl) return;

    // Extract owner and repo from the URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      setError("Invalid GitHub repository URL.");
      setLoading(false);
      return;
    }
    const [, owner, repo] = match;

    // Optionally use a GitHub token for higher rate limits
    const headers: Record<string, string> = {};
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      headers["Authorization"] =
        `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
    }

    fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch GitHub stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load GitHub statistics, maybe soon...");
        setLoading(false);
      });
  }, [repoUrl]);

  if (!repoUrl) return null;

  return (
    <div className="mx-auto my-8 flex max-w-2xl flex-col items-center rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
      <div className="items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700 w-full">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 w-full hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
        >
          <FaGithub className="h-6 w-6" />
          View this project on GitHub
        </a>
        {loading ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Loading repository stats...
          </span>
        ) : error ? (
          <span className="text-sm text-red-500">{error}</span>
        ) : stats ? (
          <div className="mt-2 flex gap-8">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <FaStar className="text-yellow-400" /> {stats.stargazers_count}{" "}
              <span className="ml-1 text-xs">Stars</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <FaCodeBranch className="text-green-500" /> {stats.forks_count}{" "}
              <span className="ml-1 text-xs">Forks</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <FaEye className="text-blue-400" /> {stats.watchers_count}{" "}
              <span className="ml-1 text-xs">Watchers</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
