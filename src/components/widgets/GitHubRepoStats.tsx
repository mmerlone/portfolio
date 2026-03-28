"use client";

import { use } from "react";
import { siteConfig } from "@/config/site";
import { FaStar, FaCodeBranch, FaEye, FaGithub } from "react-icons/fa";
import { TiltBox } from "@/components/ui/TiltBox";
import { type GitHubRepoStatsWidgetData } from "@/types/api";

interface GitHubRepoStatsProps {
  repoStatsPromise: Promise<GitHubRepoStatsWidgetData>;
}

export default function GitHubRepoStats({
  repoStatsPromise,
}: GitHubRepoStatsProps): React.ReactElement | null {
  const repoUrl = siteConfig.github?.repoUrl ?? "";
  const { stats, errorMessage } = use(repoStatsPromise);

  if (!repoUrl) {
    return null;
  }

  return (
    <TiltBox>
      <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
        <div className="w-full items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex w-full items-center gap-2 text-lg font-semibold text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
          >
            <FaGithub className="h-6 w-6" />
            View this project on GitHub
          </a>
          {errorMessage ? (
            <span className="text-sm text-red-500">
              {errorMessage}
            </span>
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
    </TiltBox>
  );
}

export function GitHubRepoStatsFallback(): React.ReactElement {
  return (
    <TiltBox>
      <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
        <div className="w-full items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Loading repository stats...
          </span>
        </div>
      </div>
    </TiltBox>
  );
}
