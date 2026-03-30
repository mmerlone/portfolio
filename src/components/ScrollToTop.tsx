"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

interface ScrollToTopProps {
  className?: string;
}

const ScrollToTop = ({ className = "" }: ScrollToTopProps): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return (): void => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed right-8 bottom-8 z-40 transform rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-indigo-700 hover:shadow-xl",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        className,
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={20} weight="bold" />
    </button>
  );
};

export default ScrollToTop;
