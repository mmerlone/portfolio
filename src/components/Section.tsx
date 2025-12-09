"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  largeMargin?: string;
  smallMargin?: string;
}

export default function Section({
  children,
  className,
  largeMargin = "mb-164",
  smallMargin = "mb-8",
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-700",
        inView ? smallMargin : largeMargin,
        className,
      )}
    >
      {children}
    </div>
  );
}
