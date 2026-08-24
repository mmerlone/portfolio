"use client";

import { type ChangeEvent, type ReactElement } from "react";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useTheme } from "next-themes";
import { themes, ThemeEnum } from "@/types/theme";

export default function ThemeToggleClient(): ReactElement {
  const { theme: currentTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const currentValue = isHydrated
    ? (themes.find((theme) => theme === currentTheme) ?? ThemeEnum.SYSTEM)
    : ThemeEnum.SYSTEM;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextTheme = themes.find((theme) => theme === event.target.value);
    if (nextTheme) setTheme(nextTheme);
  };

  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
      <span>Theme</span>
      <select
        id="theme-selection"
        name="theme"
        value={currentValue}
        onChange={handleChange}
        className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option value={ThemeEnum.SYSTEM}>System</option>
        <option value={ThemeEnum.LIGHT}>Light</option>
        <option value={ThemeEnum.DARK}>Dark</option>
      </select>
    </label>
  );
}
