"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

interface ScrollToTopProps {
  className?: string;
}

const ScrollToTop = ({
  className = "",
}: ScrollToTopProps): ReactElement | null => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return (): void => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = (): void => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed right-8 bottom-8 z-40 rounded-full bg-indigo-600 p-3 text-white hover:bg-indigo-700",
        className,
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={20} weight="bold" />
    </button>
  );
};

export default ScrollToTop;
