"use client";

import { useEffect, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpIcon } from "@phosphor-icons/react";

interface ScrollToTopProps {
  className?: string;
}

const ScrollToTop = ({
  className = "",
}: ScrollToTopProps): ReactElement | null => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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

  const navigateToTop = (): void => {
    router.replace("/", { scroll: true });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={navigateToTop}
      className={`fixed right-8 bottom-8 z-50 rounded-full bg-orange-700 p-3 text-white hover:bg-orange-800 dark:bg-orange-400 dark:text-gray-900 dark:hover:bg-orange-300 ${className}`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={20} weight="bold" />
    </button>
  );
};

export default ScrollToTop;
