"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { cn } from "@/lib/cn";

interface ScrollProgressBarProps {
  className?: string;
}

const ScrollProgressBar = ({
  className = "",
}: ScrollProgressBarProps): ReactElement => {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = (): void => {
      frame = 0;
      const element = fillRef.current;
      if (!element) return;

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      element.style.setProperty("--scroll-progress", String(ratio));
    };

    const requestUpdate = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return (): void => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "scroll-progress fixed top-0 right-0 left-0 z-[55]",
        className,
      )}
    >
      <div ref={fillRef} className="scroll-progress__fill" />
    </div>
  );
};

export default ScrollProgressBar;
