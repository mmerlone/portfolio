"use client";

import { cn } from "@/lib/cn";
import React from "react";

interface AuroraEffectProps {
  showRadialGradient?: boolean;
}

export const AuroraEffect = ({
  showRadialGradient = true,
}: AuroraEffectProps): React.ReactElement => {
  return (
    <div className="inset-0 text-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "aurora-effect-element",
            showRadialGradient && "with-radial-mask",
          )}
        ></div>
      </div>
    </div>
  );
};
