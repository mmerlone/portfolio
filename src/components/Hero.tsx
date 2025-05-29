"use client";

import { apiConfig } from "@/config/api";
import { siteConfig } from "@/config/site";
import { HeroProps } from "@/types/components";
import Weather from "@/components/widgets/Weather";
import GitHubRepoStats from "@/components/widgets/GitHubRepoStats";

const Hero = ({ className = "", weatherEnabled }: HeroProps) => {
  return (
    <section
      id="top"
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-gray-400 to-orange-300 dark:from-gray-900/90 dark:via-gray-900 dark:to-orange-900/90">
        <div className="hero-background absolute inset-0 opacity-60 dark:opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-20">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <h2 className="mb-4 text-xl text-gray-700 sm:text-2xl md:text-3xl lg:text-4xl dark:text-gray-300">
              {siteConfig.title}
            </h2>
            <p className="mb-8 text-lg text-orange-700 sm:text-xl md:text-2xl dark:text-orange-400">
              {siteConfig.headline}
            </p>
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
              {weatherEnabled && <Weather city={apiConfig.city} />}
            </div>
          </div>

          {/* Image */}
          <div className="relative flex-1">
            <div className="group relative mx-auto w-full max-w-lg">
              {/* <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-lime-500/20 to-indigo-500/20 blur-3xl transition-all duration-500" /> */}
              <div className="relative mr-3 transform rounded-full transition-all duration-500">
                <img
                  src={siteConfig.images.profile}
                  alt={siteConfig.name}
                  width={500}
                  height={500}
                  className="rounded-full shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_150px_rgba(245,74,0,0.4)] dark:group-hover:shadow-[0_0_150px_rgba(123,23,0,1)]"
                  // priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
