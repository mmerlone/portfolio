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
    <div className="border-border-strong a3d-border mx-auto max-w-2xl rounded-lg border p-6">
      <div className="flex w-full flex-col items-start p-4">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent mb-4 flex w-full items-center gap-2 text-lg font-semibold"
        >
          <GithubLogoIcon size={24} weight="bold" />
          View this project on GitHub
        </a>
        {errorMessage ? (
          <span className="text-sm text-red-500">{errorMessage}</span>
        ) : stats ? (
          <div className="mt-2 flex max-w-full flex-wrap gap-x-8 gap-y-2">
            <div className="text-muted-foreground flex items-center gap-1">
              <StarIcon size={20} weight="fill" className="text-yellow-400" />{" "}
              {stats.stargazers_count}{" "}
              <span className="ml-1 text-xs">Stars</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <GitBranchIcon
                size={20}
                weight="bold"
                className="text-green-500"
              />{" "}
              {stats.forks_count} <span className="ml-1 text-xs">Forks</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
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
    <div className="border-border-strong mx-auto max-w-2xl border p-6">
      <div className="w-full items-center space-x-4 p-4">
        <span className="text-subtle-foreground text-sm">
          Loading repository stats...
        </span>
      </div>
    </div>
  );
}
