"use client";

import { type ElementType, type ReactElement } from "react";
import ConfigIcon from "@/components/ui/config/ConfigIcon";
import {
  ConfigToggle,
  type ConfigOption,
} from "@/components/ui/config/ConfigToggle";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useTheme } from "next-themes";
import { type ThemeType, ThemeEnum } from "@/types/theme";
import { SunIcon, MoonIcon, DesktopIcon } from "@phosphor-icons/react";

export default function ThemeToggleClient(): ReactElement {
  const { theme: currentTheme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();

  const typedCurrentTheme = currentTheme as ThemeType | undefined;
  const currentValue =
    isHydrated ? (typedCurrentTheme ?? ThemeEnum.SYSTEM) : ThemeEnum.SYSTEM;

  const themeIconMap: Partial<Record<ThemeType, ElementType>> = {
    [ThemeEnum.LIGHT]: SunIcon,
    [ThemeEnum.DARK]: MoonIcon,
    [ThemeEnum.SYSTEM]: DesktopIcon,
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
        size: 18,
      }),
    }),
  );

  return (
    <ConfigToggle<ThemeType>
      options={themeOptions}
      currentValue={currentValue}
      onValueChange={setTheme}
      ariaLabel="Select theme"
    />
  );
}
