"use client";

import { aboutData } from "@/data/about";
import { SectionTitle } from "./ui/SectionTitle";
import { BackgroundEffects } from "./ui/BackgroundEffects";
import { BackgroundEffectsEnum, EffectsEnum } from "@/types/effects";
import { cn } from "@/lib/cn";

interface AboutProps {
  className?: string;
}

export default function About({ className }: AboutProps) {
  return (
    <section
      id="about"
      className={cn(
        "relative py-24",
        className,
      )}
    >
      <BackgroundEffects
        backgrounds={{
          [EffectsEnum.OFF]: BackgroundEffectsEnum.STATIC_COLOR,
          [EffectsEnum.EXPERIMENTAL]: BackgroundEffectsEnum.EXPERIENCE,
        }}
      >
        <div className="relative z-10 container mx-auto px-4">
          <SectionTitle>{aboutData.title}</SectionTitle>
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-200">
              {aboutData.headline}
            </p>
            {aboutData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-gray-600 dark:text-gray-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </BackgroundEffects>
    </section>
  );
}
