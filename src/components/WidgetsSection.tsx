"use client";

import { Suspense } from "react";
import { cn } from "@/lib/cn";
import Weather, { WeatherFallback } from "@/components/widgets/Weather";
import GitHubRepoStats, {
  GitHubRepoStatsFallback,
} from "@/components/widgets/GitHubRepoStats";
import { type WidgetsSectionProps } from "@/types/components";

const WidgetsSection = ({
  className = "",
  repoStatsPromise,
  weatherPromise,
}: WidgetsSectionProps): React.ReactElement => {
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
};

export default WidgetsSection;
