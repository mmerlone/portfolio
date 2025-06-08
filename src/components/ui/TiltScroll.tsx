"use client";
// https://21st.dev/aceternity/container-scroll-animation/default

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { EffectsEnum } from "@/types/effects";

export const TiltScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "start start"],
  });

  const [isMobile, setIsMobile] = useState(false); // Temporarily removed for debugging
  const { effect } = useConfigEffects();
  const isEnabled = effect === EffectsEnum.EXPERIMENTAL;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <div
      className="effect-tiltscroll relative m-0 flex items-center justify-center"
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1000px",
        }}
      >
        {isEnabled ? (
          <TiltScrollCard rotate={rotate} translate={translate} scale={scale}>
            {children}
          </TiltScrollCard>
        ) : (
          <div className="rounded-2xl bg-gray-200 shadow-xl shadow-black/50 dark:bg-gray-900">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const TiltScrollCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto mb-16 w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-3 shadow-2xl md:p-6"
    >
      {children}
    </motion.div>
  );
};
