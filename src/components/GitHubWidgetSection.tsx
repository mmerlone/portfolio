import { Suspense, type ReactElement } from "react";
import GitHubRepoStats, {
  GitHubRepoStatsFallback,
} from "@/components/widgets/GitHubRepoStats";
import type { GitHubRepoStatsWidgetData } from "@/types/api";

interface GitHubWidgetSectionProps {
  repoStatsPromise: Promise<GitHubRepoStatsWidgetData>;
}

export default function GitHubWidgetSection({
  repoStatsPromise,
}: GitHubWidgetSectionProps): ReactElement {
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="border-border border-y py-12"
    >
      <div className="container mx-auto px-4">
        <h2
          id="github-heading"
          className="text-accent mb-6 text-center text-2xl font-bold"
        >
          GitHub
        </h2>
        <Suspense fallback={<GitHubRepoStatsFallback />}>
          <GitHubRepoStats repoStatsPromise={repoStatsPromise} />
        </Suspense>
      </div>
    </section>
  );
}
