"use client";

import { cn } from "@/lib/cn";
import Weather from "@/components/widgets/Weather";
import GitHubRepoStats from "@/components/widgets/GitHubRepoStats";
import { apiConfig } from "@/config/api";
import { BackgroundEffectsEnum, EffectsEnum } from "@/types/effects";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";

const WidgetsSection = ({ className = "" }) => {
  const weatherEnabled = !!apiConfig.openWeather?.city;

  return (
    <section
      id="widgets"
      className={cn(
        "relative flex items-center justify-center overflow-hidden py-8",
        className,
      )}
    >
      <BackgroundEffects
        backgrounds={{
          [EffectsEnum.OFF]: BackgroundEffectsEnum.HERO,
          [EffectsEnum.EXPERIMENTAL]: BackgroundEffectsEnum.AURORA,
        }}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4">
          <GitHubRepoStats />
          {weatherEnabled && <Weather />}
        </div>
      </BackgroundEffects>
    </section>
  );
};

export default WidgetsSection; 