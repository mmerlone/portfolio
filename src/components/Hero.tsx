"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { HeroProps } from "@/types/components";
import Weather from "@/components/Weather";
import Quote from "@/components/Quote";

const Hero = ({ className = "" }: HeroProps) => {
  const [isWeatherEnabled, setIsWeatherEnabled] = useState(false);

  useEffect(() => {
    setIsWeatherEnabled(!!siteConfig.weather?.apiKey);
  }, []);

  return (
    <section
      id="top"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-white to-orange-50/90 dark:from-gray-900/90 dark:via-gray-900 dark:to-orange-900/90">
        <div className="absolute inset-0 opacity-10 dark:opacity-20 hero-background" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {siteConfig.name}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 mb-4">
              {siteConfig.title}
            </h2>
            {/* Use the new "headline" for the tagline */}
            <p className="text-xl md:text-2xl text-orange-600 dark:text-orange-400 mb-8">
              {siteConfig.headline}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </a>
              <a
                href="#about"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Learn More
              </a>
            </div>
            <div className="mt-8">
              <Quote />
              {isWeatherEnabled && <Weather />}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-indigo-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 group-hover:from-orange-500/40 group-hover:to-indigo-500/40 transition-all duration-500" />
              <div className="relative transform transition-all duration-500">
                <Image
                  src={siteConfig.images.profile}
                  alt={siteConfig.name}
                  width={500}
                  height={500}
                  className="rounded-full shadow-2xl group-hover:shadow-[0_0_50px_rgba(234,88,12,0.5)] transition-all duration-500"
                  priority
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
