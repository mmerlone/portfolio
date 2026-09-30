"use client";

import { useEffect, useState, type ReactElement } from "react";
import { Progress } from "@/components/ui/progress";

/**
 * Reading progress across the whole document. The value is rounded to whole
 * percent and the bar is labelled, so assistive technology reports a stable
 * figure rather than a value that changes on every scroll frame.
 */
const ScrollProgressBar = (): ReactElement => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = (): void => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      setValue(Math.round(ratio * 100));
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
    <Progress
      value={value}
      aria-label="Reading progress"
      className="scroll-progress [&_[data-slot=progress-indicator]]:bg-primary pointer-events-none fixed top-0 right-0 left-0 z-55 gap-0 [&_[data-slot=progress-track]]:h-[3px]"
    />
  );
};

export default ScrollProgressBar;
