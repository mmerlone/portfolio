import { use, type ReactElement } from "react";
import { siteConfig } from "@/config/site";
import {
  StarIcon,
  GitBranchIcon,
  EyeIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/ssr";
import { type GitHubRepoStatsWidgetData } from "@/types/api";

interface GitHubRepoStatsProps {
  repoStatsPromise: Promise<GitHubRepoStatsWidgetData>;
}

export default function GitHubRepoStats({
  repoStatsPromise,
}: GitHubRepoStatsProps): ReactElement | null {
  const repoUrl = siteConfig.github?.repoUrl ?? "";
  const { stats, errorMessage } = use(repoStatsPromise);

  if (!repoUrl) {
    return null;
  }

  return (
    <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
      <div className="flex w-full flex-col items-start rounded-lg bg-white p-4 dark:bg-gray-700">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 flex w-full items-center gap-2 text-lg font-semibold text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
        >
          <GithubLogoIcon size={24} weight="bold" />
          View this project on GitHub
        </a>
        {errorMessage ? (
          <span className="text-sm text-red-500">{errorMessage}</span>
        ) : stats ? (
          <div className="mt-2 flex gap-8">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <StarIcon size={20} weight="fill" className="text-yellow-400" />{" "}
              {stats.stargazers_count}{" "}
              <span className="ml-1 text-xs">Stars</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <GitBranchIcon
                size={20}
                weight="bold"
                className="text-green-500"
              />{" "}
              {stats.forks_count} <span className="ml-1 text-xs">Forks</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <EyeIcon size={20} weight="bold" className="text-blue-400" />{" "}
              {stats.watchers_count}{" "}
              <span className="ml-1 text-xs">Watchers</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function GitHubRepoStatsFallback(): ReactElement {
  return (
    <div className="z-30 mx-auto my-8 max-w-2xl rounded-lg bg-gray-200 p-6 shadow-lg dark:bg-gray-800">
      <div className="w-full items-center space-x-4 rounded-lg bg-white p-4 dark:bg-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Loading repository stats...
        </span>
      </div>
    </div>
  );
}
