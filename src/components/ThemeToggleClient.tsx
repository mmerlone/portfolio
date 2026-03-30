"use client";

import { type ElementType, type ReactElement } from "react";
import ConfigIcon from "@/components/ui/config/ConfigIcon";
import {
  ConfigToggle,
  type ConfigOption,
} from "@/components/ui/config/ConfigToggle";
import { useTheme } from "next-themes";
import { type ThemeType, ThemeEnum } from "@/types/theme";
import { SunIcon, MoonIcon, DesktopIcon } from "@phosphor-icons/react";

export default function ThemeToggleClient(): ReactElement {
  const { theme: currentTheme, resolvedTheme, setTheme } = useTheme();

  const typedCurrentTheme = currentTheme as ThemeType | undefined;

  const themeIconMap: Partial<Record<ThemeType, ElementType>> = {
    [ThemeEnum.LIGHT]: SunIcon,
    [ThemeEnum.DARK]: MoonIcon,
    [ThemeEnum.SYSTEM]:
      resolvedTheme === ThemeEnum.DARK
        ? MoonIcon
        : resolvedTheme === ThemeEnum.LIGHT
          ? SunIcon
          : DesktopIcon,
  };

  const themeOptions: ConfigOption<ThemeType>[] = Object.values(ThemeEnum).map(
    (t): ConfigOption<ThemeType> => ({
      value: t,
      label: `Switch to ${t.charAt(0).toUpperCase() + t.slice(1)} theme`,
      labelSelected: `${t.charAt(0).toUpperCase() + t.slice(1)} Theme selected`,
      IconComponent: ConfigIcon,
      getIconProps: (value: ThemeType) => ({
        value,
        iconMap: themeIconMap,
        defaultIconComponent: SunIcon,
      }),
    }),
  );

  return (
    <div>
      <ConfigToggle<ThemeType>
        options={themeOptions}
        currentValue={typedCurrentTheme ?? ThemeEnum.SYSTEM}
        onValueChange={setTheme}
        ariaLabel="Select theme"
      />
    </div>
  );
}
