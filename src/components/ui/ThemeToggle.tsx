"use client";

import { useEffect, useState } from "react";
// import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import ToggleButton from "@/components/ui/ThemeToggleButton";

const themes = ["light", "system", "dark"];
export type Theme = (typeof themes)[number];

const THEME_KEY = "theme-preference";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const root = window.document.documentElement;

  if (theme === "system") {
    const systemTheme = getSystemTheme();
    root.removeAttribute("data-theme");
    root.classList.toggle("dark", systemTheme === "dark");
  } else {
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  }
}

export default function ThemeToggle({
  className = "system",
}: {
  className?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored: Theme | null =
      typeof window !== "undefined" ? localStorage.getItem(THEME_KEY) : null;

    if (themes.includes(stored as Theme)) {
      setTheme(stored as Theme);
    } else {
      setTheme("system");

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (theme === "system") applyTheme("system");
      };
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const systemTheme = getSystemTheme();
    if (theme === "system") {
      applyTheme(systemTheme);
    } else {
      applyTheme(theme);
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const handleClick = (theme: Theme) => {
    setTheme(theme);
  };

  const selectedPosition =
    theme === "light"
      ? "left-1"
      : theme === "system"
        ? "left-1/2 -translate-x-1/2"
        : "right-1";

  return (
    <div
      className={`relative z-10 w-21 flex h-7 items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 p-1 m-2 shadow transition-colors focus:ring-1 focus:ring-orange-500 focus:outline-none ${className}`}
    >
      <span
        className={`absolute top-1/2 ${selectedPosition} outline-gray-100 dark:outline-gray-400 z-20 h-5 w-5 -translate-y-1/2 rounded-full outline transition-all duration-300 outline-solid`}
        aria-hidden="true"
        title={`Theme set to ${theme}`}
      >
        &nbsp;
      </span>
      {themes.map((t) => (
        <ToggleButton key={t} theme={t} handleClick={handleClick} selected={theme === t}/>
      ))}
    </div>
  );
}
