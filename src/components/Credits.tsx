"use client";

import { type FC, type ReactElement } from "react";
import { cn } from "@/lib/cn";
import { creditsData } from "@/data/credits";
import { SectionTitle } from "./ui/SectionTitle";
import { Carousel3D } from "./ui/Carousel3D";
import type { Credit } from "@/types/credits";

interface CreditsProps {
  className?: string;
}

const Credits: FC<CreditsProps> = ({
  className = "",
}: CreditsProps): ReactElement => {
  return (
    <section
      id="credits"
      className="relative flex items-center justify-center overflow-hidden"
    >
      <div className={cn("bg-surface-muted w-full", className)}>
        <div className="relative z-10 container flex flex-col items-center justify-center">
          <SectionTitle>Portfolio Credits</SectionTitle>
          <p className="text-muted-foreground mx-5 py-5 leading-relaxed first:mt-0 sm:mx-12 sm:text-center sm:text-balance">
            This portfolio showcases my recent experience and gratitude to the
            following companies and technologies, made possible by the
            contributions of many talented individuals.
          </p>
          <div className="mx-auto my-8 w-full py-2">
            <Carousel3D credits={creditsData as Credit[]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credits;
