import React, { ReactNode, useState } from "react";
import { tiltBoxEffect } from "@/lib/effects";
import { useConfigEffects } from "@/context/ConfigEffectsContext"
import { EffectsEnum } from "@/types/effects";

interface TiltBoxProps {
  children: ReactNode;
}

export const TiltBox = ({
  children,
}: TiltBoxProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    return tiltBoxEffect(e, setPosition);
  };
  const { effect } = useConfigEffects();
  const isEnabled = effect === EffectsEnum.EXPERIMENTAL;

  return (
    <div
      onMouseMove={isEnabled ? handleMouseMove : undefined}
      style={
        isEnabled ? {
          transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg)`,
          transition: "transform 0.2s ease-out",
        }
          : {}
      }
    >
      {children}
    </div>
  );
};
