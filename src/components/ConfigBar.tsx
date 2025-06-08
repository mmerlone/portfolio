"use client";

import { ExpandableTabs, type TabItem } from "@/components/ui/ExpandableTabs";
import ConfigIcon from "@/components/ui/config/ConfigIcon";
import { ConfigToggle,
  type ConfigOption,
} from "@/components/ui/config/ConfigToggle";
import { useTheme } from "next-themes";
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { ThemeType, ThemeEnum } from "@/types/theme";
import { EffectsEnum, EffectsType } from "@/types/effects";
import { useEffect, useState } from "react";
import {
  FaSun,
  FaMoon,
  FaDesktop,
  FaToggleOff,
  FaMagic,
} from "react-icons/fa";

export default function ConfigBar() {
  const { theme: currentTheme, setTheme } = useTheme();
  const {
    effect: currentEffect,
    setEffect,
    isMounted: effectsAreMounted,
  } = useConfigEffects();
  const [themesAreMounted, setThemesAreMounted] = useState(false);

  useEffect(() => {
    setThemesAreMounted(true);
  }, []);

  const handleEffectsChange = (eff: EffectsType) => {
    setEffect(eff as unknown as EffectsEnum);
  };

  const typedCurrentTheme = currentTheme as ThemeType | undefined;

  const themeIconMap: Partial<Record<ThemeType, React.ElementType>> = {
    [ThemeEnum.LIGHT]: FaSun,
    [ThemeEnum.DARK]: FaMoon,
    [ThemeEnum.SYSTEM]: FaDesktop,
  };

  const effectsIconMap: Partial<Record<EffectsType, React.ElementType>> = {
    [EffectsEnum.OFF]: FaToggleOff,
    [EffectsEnum.EXPERIMENTAL]: FaMagic,
  };

  const themeOptions: ConfigOption<ThemeType>[] = Object.values(ThemeEnum).map(
    (t) => ({
      value: t,
      label: `Switch to ${t.charAt(0).toUpperCase() + t.slice(1)} theme`,
      labelSelected: `${t.charAt(0).toUpperCase() + t.slice(1)} Theme selected`,
      IconComponent: ConfigIcon,
      getIconProps: (value: ThemeType) => ({
        value,
        iconMap: themeIconMap,
        defaultIconComponent: FaSun,
      }),
    }),
  );

  const effectOptions: ConfigOption<EffectsType>[] = Object.values(EffectsEnum).map(
    (e) => ({
      value: e,
      label: `Switch to ${e.charAt(0).toUpperCase() + e.slice(1)} effects`,
      labelSelected:
        e === EffectsEnum.OFF
          ? "Showing a simpler version with less effects."
          : "Experimental effects selected! Handle with care and please report bugs.",
      IconComponent: ConfigIcon,
      getIconProps: (value: EffectsType) => ({
        value,
        iconMap: effectsIconMap,
        defaultIconComponent: FaMagic,
      }),
    }),
  );

  const configTabs: TabItem[] = [
    {
      title: "Theme",
      label: themesAreMounted && typedCurrentTheme
        ? `${typedCurrentTheme.charAt(0).toUpperCase() + typedCurrentTheme.slice(1)} Theme selected`
        : "Select Theme", // Or "" if you prefer no text before mount
      icon: (props) => (
        <ConfigIcon
          {...props}
          value={themesAreMounted ? typedCurrentTheme : undefined}
          iconMap={themeIconMap}
          defaultIconComponent={FaDesktop}
        />
      ),
      component: (
        <ConfigToggle<ThemeType>
          options={themeOptions}
          currentValue={typedCurrentTheme ?? ThemeEnum.SYSTEM}
          onValueChange={setTheme}
          ariaLabel="Select theme"
        />
      ),
    },
    {
      title: "Effects",
      label: effectsAreMounted && currentEffect
        ? `${currentEffect.charAt(0).toUpperCase() + currentEffect.slice(1)} Effects selected`
        : "Select Effects", // Or ""
      icon: (props) => (
        <ConfigIcon
          {...props}
          value={effectsAreMounted ? currentEffect : undefined}
          iconMap={effectsIconMap}
          defaultIconComponent={FaMagic}
        />
      ),
      component: (
        <ConfigToggle<EffectsType>
          options={effectOptions}
          currentValue={currentEffect}
          // onValueChange={setEffect}
          ariaLabel="Select visual effect intensity"
          onValueChange={handleEffectsChange}
        />
      ),
    },
  ];

  return (
    <div className="flex-none">
      <ExpandableTabs
        tabs={configTabs}
        activeColor="text-primary inset-shadow-xl inset-shadow-black/50"
      />
    </div>
  );
}
