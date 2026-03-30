import { Suspense, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import Weather, { WeatherFallback } from "@/components/widgets/Weather";
import GitHubRepoStats, {
  GitHubRepoStatsFallback,
} from "@/components/widgets/GitHubRepoStats";
import type { GitHubRepoStatsWidgetData, WeatherWidgetData } from "@/types/api";

interface WidgetsSectionProps {
  className?: string;
  repoStatsPromise: Promise<GitHubRepoStatsWidgetData> | null;
  weatherPromise: Promise<WeatherWidgetData> | null;
}

export default function WidgetsSection({
  className = "",
  repoStatsPromise,
  weatherPromise,
}: WidgetsSectionProps): ReactElement {
  return (
    <section
      id="widgets"
      className={cn(
        "relative flex items-center justify-center overflow-hidden py-8",
        className,
      )}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4">
        {repoStatsPromise ? (
          <Suspense fallback={<GitHubRepoStatsFallback />}>
            <GitHubRepoStats repoStatsPromise={repoStatsPromise} />
          </Suspense>
        ) : null}
        {weatherPromise ? (
          <Suspense fallback={<WeatherFallback />}>
            <Weather weatherPromise={weatherPromise} />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
}
