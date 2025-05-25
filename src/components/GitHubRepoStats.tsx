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
      headers[
        "Authorization"
      ] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
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
        setError("Could not load GitHub statistics.");
        setLoading(false);
      });
  }, [repoUrl]);

  if (!repoUrl) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8 flex flex-col items-center">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 mb-4"
      >
        <FaGithub className="w-6 h-6" />
        View this project on GitHub
      </a>
      {loading ? (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Loading repository stats...
        </span>
      ) : error ? (
        <span className="text-red-500 text-sm">{error}</span>
      ) : stats ? (
        <div className="flex gap-8 mt-2">
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
  );
}
