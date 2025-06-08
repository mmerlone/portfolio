"use client";

import { creditsData } from "@/data/credits";
import { SectionTitle } from "./ui/SectionTitle";
import { CardCredit } from "./ui/CardCredit";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { Carousel3D } from "./ui/Carousel3D";
import type { Credit } from "@/types/credits";
import { FC } from "react";
import { cn } from "@/lib/cn";
import { BackgroundEffects } from "@components/ui/BackgroundEffects";
import { EffectsEnum } from "@/types/effects";

interface CreditsProps {
  className?: string;
}

const Credits: FC<CreditsProps> = ({
  className = "",
}: {
  className?: string;
}) => {
  const { effect, isMounted: configEffectsAreMounted } = useConfigEffects();
  const isEffectEnabled = effect === EffectsEnum.EXPERIMENTAL;

  return (
    <section
      id="credits"
      className="relative flex items-center justify-center overflow-hidden"
    >
      <BackgroundEffects
        backgrounds={{}}
        className={cn("bg-gray-200 dark:bg-gray-900", className)}
      >
        {configEffectsAreMounted ? (
          <div className="relative z-10 container flex flex-col items-center justify-center">
            <SectionTitle>Credits</SectionTitle>
            <p className="mx-5 py-5 leading-relaxed text-gray-800 first:mt-0 sm:mx-12 sm:text-center sm:text-balance dark:text-gray-300">
              This portfolio showcases my recent experience and gratitude to the following
              companies and technologies, made possible by the contributions of
              many talented individuals.
            </p>
            <div className="mx-auto my-8 w-full py-2">
              {isEffectEnabled ? (
                <Carousel3D credits={creditsData as Credit[]} />
              ) : (
                <Carousel
                  autoPlay={false}
                  infiniteLoop={true}
                  showStatus={false}
                  showThumbs={false}
                  showArrows={true}
                >
                  {creditsData.map((credit) => (
                    <CardCredit key={credit.name} credit={credit} />
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        ) : (
          <div className="relative z-10 container flex flex-col items-center justify-center">
            <SectionTitle>Credits</SectionTitle>
            <p className="mx-5 py-5 leading-relaxed text-gray-800 first:mt-0 sm:mx-12 sm:text-center sm:text-balance dark:text-gray-300">
              This portfolio showcases my recent experience with the following
              companies and technologies, made possible by the contributions of
              many talented individuals.
            </p>
            <div className="mx-auto my-8 w-full py-2">
              <Carousel
                autoPlay={false}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false}
                showArrows={true}
              >
                {creditsData.map((credit) => (
                  <CardCredit key={credit.name} credit={credit} />
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </BackgroundEffects>
    </section>
  );
};

export default Credits;
