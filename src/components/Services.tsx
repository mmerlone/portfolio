"use client";

import { servicesConfig } from "@/data/services";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { BackgroundEffectsEnum, EffectsEnum } from "@/types/effects";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ServicesProps {
  className?: string;
}

export default function Services({ className }: ServicesProps) {
  return (
    <section
      id="services"
      className={cn(
        "relative",
        className,
      )}
    >
      <BackgroundEffects
        backgrounds={{
          [EffectsEnum.OFF]: BackgroundEffectsEnum.STATIC_COLOR,
          [EffectsEnum.EXPERIMENTAL]: BackgroundEffectsEnum.SERVICES,
        }}
      >
        <div className="container mx-auto py-8 px-4">
          <div className="mb-16 text-center">
            <SectionTitle>{servicesConfig.title}</SectionTitle>
            {servicesConfig.subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {servicesConfig.subtitle}
              </p>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesConfig.services.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BackgroundEffects>
    </section>
  );
} 