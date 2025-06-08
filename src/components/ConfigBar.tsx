"use client";

import { useTheme } from "next-themes";
import { useConfigEffects } from "@/context/ConfigEffectsContext";
import { ConfigToggle } from "./ui/config/ConfigToggle";
import ConfigIcon from "./ui/config/ConfigIcon";

export default function ConfigBar() {
  const { theme: currentTheme = "light", setTheme } = useTheme();
  const { effect: currentEffect, setEffect } = useConfigEffects();

  const themes = [
    {
      value: "light",
      label: "Light Theme",
      IconComponent: ConfigIcon,
      getIconProps: () => ({ theme: "light" }),
    },
    {
      value: "dark",
      label: "Dark Theme",
      IconComponent: ConfigIcon,
      getIconProps: () => ({ theme: "dark" }),
    },
  ];

  const effects = [
    {
      value: "none",
      label: "No Effect",
      IconComponent: ConfigIcon,
      getIconProps: () => ({ effect: "none" }),
    },
    {
      value: "experience",
      label: "Experience Effect",
      IconComponent: ConfigIcon,
      getIconProps: () => ({ effect: "experience" }),
    },
  ];

  return (
    <div className="config-bar">
      <ConfigToggle
        options={themes}
        currentValue={currentTheme}
        onValueChange={setTheme}
        ariaLabel="Theme Selection"
      />
      <ConfigToggle
        options={effects}
        currentValue={currentEffect}
        onValueChange={setEffect}
        ariaLabel="Background Effect Selection"
      />
    </div>
  );
}
