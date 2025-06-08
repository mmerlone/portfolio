"use client";

import React, { ReactNode } from "react";
import {
  BackgroundEffectsEnum,
  EffectsEnum,
} from "@/types/effects";
import { AuroraEffect } from "./background-effects/AuroraEffect";
import { PathsEffect } from "./background-effects/PathsEffect";
import { HeroEffect } from "./background-effects/HeroEffect";
import { StaticColorEffect } from "./background-effects/StaticColorEffect";
import { FooterEffect } from "./background-effects/FooterEffect";
import { ExperienceEffect } from "./background-effects/ExperienceEffect"; // New import
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { cn } from "@/lib/cn";

interface BackgroundEffectsProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  backgrounds: Partial<Record<EffectsEnum, BackgroundEffectsEnum>>;
  className?: string; // This className is for the overall section/container
  showRadialGradient?: boolean; // Only for aurora
}

const effectComponents = {
  [BackgroundEffectsEnum.AURORA]: AuroraEffect,
  [BackgroundEffectsEnum.PATHS]: PathsEffect,
  [BackgroundEffectsEnum.HERO]: HeroEffect,
  [BackgroundEffectsEnum.STATIC_COLOR]: StaticColorEffect,
  [BackgroundEffectsEnum.FOOTER]: FooterEffect,
  [BackgroundEffectsEnum.EXPERIENCE]: ExperienceEffect, // New entry
};

export const BackgroundEffects = ({
  className,
  children,
  backgrounds,
  showRadialGradient,
  ...props
}: BackgroundEffectsProps) => {
  const { effect } = useConfigEffects();

  const activeBackground =
    backgrounds[effect] || BackgroundEffectsEnum.STATIC_COLOR;

  const EffectComponent = effectComponents[activeBackground];

  if (!EffectComponent) {
    console.warn(`Unknown background effect type: ${activeBackground}`);
    return null;
  }

  // Props specific to the EffectComponent, not the outer container
  const effectSpecificProps =
    activeBackground === BackgroundEffectsEnum.AURORA
      ? { showRadialGradient }
      : {};

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className,
        "b-effect-" + activeBackground,
      )}
      {...props}
    >
      <div className="absolute inset-0 transition-all">
        <EffectComponent {...effectSpecificProps} />
      </div>
      {/* content */}
      <div className="b-effect-content relative z-10 container mx-auto">
        {children}
      </div>
    </div>
  );
};
