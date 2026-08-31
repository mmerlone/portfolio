"use client";

import { Fragment, type ChangeEvent, type ReactElement, useId } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useTheme } from "next-themes";
import { themes, ThemeEnum, type ThemeType } from "@/types/theme";

const themeIcons: Record<ThemeType, typeof SunIcon> = {
  [ThemeEnum.LIGHT]: SunIcon,
  [ThemeEnum.SYSTEM]: MonitorIcon,
  [ThemeEnum.DARK]: MoonIcon,
};

const themeLabels: Record<ThemeType, string> = {
  [ThemeEnum.LIGHT]: "Light",
  [ThemeEnum.SYSTEM]: "System",
  [ThemeEnum.DARK]: "Dark",
};

export default function ThemeToggleClient(): ReactElement {
  const { theme: currentTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();
  const groupId = useId();

  const currentValue = isHydrated
    ? (themes.find((theme) => theme === currentTheme) ?? ThemeEnum.SYSTEM)
    : ThemeEnum.SYSTEM;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextTheme = themes.find((theme) => theme === event.target.value);
    if (nextTheme) setTheme(nextTheme);
  };

  return (
    <fieldset className="theme-toggle" aria-label="Theme selection">
      <legend className="sr-only">Theme</legend>
      {themes.map((theme): ReactElement => {
        const id = `${groupId}-${theme}`;
        const Icon = themeIcons[theme];
        const isChecked = isHydrated && theme === currentValue;

        return (
          <Fragment key={theme}>
            <input
              id={id}
              className="theme-toggle__input"
              type="radio"
              name={groupId}
              value={theme}
              checked={isChecked}
              onChange={handleChange}
              aria-label={themeLabels[theme]}
            />
            <label htmlFor={id} className="theme-toggle__option">
              <span className="sr-only">{themeLabels[theme]}</span>
              <Icon
                size={16}
                weight={isChecked ? "fill" : "regular"}
                className="theme-toggle__icon"
              />
            </label>
          </Fragment>
        );
      })}
      {isHydrated && <span aria-hidden="true" className="theme-toggle__knob" />}
    </fieldset>
  );
}
