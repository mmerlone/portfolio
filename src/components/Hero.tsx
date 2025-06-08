/* eslint-disable @next/next/no-img-element */
"use client";

import { siteConfig } from "@/config/site";
import { HeroProps } from "@/types/components";
import Weather from "@/components/widgets/Weather";
import GitHubRepoStats from "@/components/widgets/GitHubRepoStats";
import { cn } from "@lib/cn";
import { apiConfig } from "@/config/api";
import { BackgroundEffectsEnum, EffectsEnum } from "@/types/effects";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";
import { CTA } from "@/components/ui/CTA";

const Hero = ({ className = "" }: HeroProps) => {
  const weatherEnabled = !!apiConfig.openWeather?.city;

  const renderContent = (
    <div className="hero-content flex min-h-screen flex-col items-center justify-between gap-12 lg:flex-row">
      <div className="flex-1 text-center lg:text-left pt-24 lg:pt-0">
        <h1 className="mb-6 text-3xl font-bold text-gray-700 sm:text-4xl md:text-5xl lg:text-6xl dark:text-gray-300">
          {siteConfig.name}
        </h1>
        <h2 className="mb-4 text-xl text-gray-700 sm:text-2xl md:text-3xl lg:text-4xl dark:text-gray-300">
          {siteConfig.title}
        </h2>
        <p className="mb-8 text-lg text-orange-700 sm:text-xl md:text-2xl dark:text-orange-400">
          {siteConfig.headline}
        </p>
        <CTA className="mb-8" />
        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
          <a
            href="#contact"
            className="rounded-lg bg-orange-600 px-8 py-3 text-white shadow-lg transition-colors hover:bg-orange-700 hover:shadow-xl"
          >
            Get in Touch
          </a>
          <a
            href="#about"
            className="rounded-lg bg-white px-8 py-3 text-gray-900 shadow-lg transition-colors hover:bg-gray-100 hover:shadow-xl dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Learn More
          </a>
        </div>
        <div className="mt-8">
          <GitHubRepoStats />
          {weatherEnabled && <Weather />}
        </div>
      </div>

      <div className="relative flex-1">
        <div className="group relative mx-auto w-full max-w-lg">
          <div className="relative mr-3 transform rounded-full transition-all duration-500">
            <img
              src={siteConfig.images.profile}
              alt={siteConfig.name}
              width={500}
              height={500}
              className="rounded-full shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_150px_rgba(245,74,0,0.4)] dark:group-hover:shadow-[0_0_150px_rgba(123,23,0,1)]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="top"
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden",
        className,
      )}
    >
      <BackgroundEffects
        backgrounds={{
          [EffectsEnum.OFF]: BackgroundEffectsEnum.HERO,
          [EffectsEnum.EXPERIMENTAL]: BackgroundEffectsEnum.AURORA,
        }}
      >
        {renderContent}
      </BackgroundEffects>
    </section>
  );
};

export default Hero;
