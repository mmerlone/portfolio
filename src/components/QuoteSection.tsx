"use client";

import Quote from "@/components/widgets/Quote";
import { cn } from "@/lib/cn";
import { QuoteProps } from "@/types/components";
import { globeConfig, sampleArcs } from "@/data/globe";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import dynamic from "next/dynamic";
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { EffectsEnum } from "@/types/effects";

// Dynamically import the World component with SSR turned off
const World = dynamic(
  () => import("@/components/ui/Globe").then((mod) => mod.World),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner className="flex h-[70px] w-full min-w-70 justify-center" />
    ),
  },
);

const QuoteSection = ({ className = "" }: QuoteProps) => {
  const { effect } = useConfigEffects();
  const isEnabled = effect === EffectsEnum.EXPERIMENTAL;

  return (
    <section
      id="quote"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-950",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        {isEnabled && (
          <div className="ml-8 flex h-90 min-w-70 items-center">
            <World globeConfig={globeConfig} data={sampleArcs} />
          </div>
        )}
        <div className="m-2 flex w-full items-center justify-center">
          <Quote />
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
