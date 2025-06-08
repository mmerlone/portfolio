"use client";

import React from "react";
import type { ConfigOption } from "./ConfigToggle";
import { cn } from "@/lib/cn";

export interface ConfigItemButtonProps<TValue extends string> {
  option: ConfigOption & {
    labelSelected?: string;
    IconComponent?: React.ComponentType<{ size?: number; className?: string }>;
    getIconProps?: (value: TValue) => Record<string, unknown>;
    iconSelectedClassName?: string;
    iconDefaultClassName?: string;
  };
  selected: boolean;
  onItemClick: (value: TValue) => void;
  iconSize?: number;
}

export default function ConfigItemButton<TValue extends string>({
  option,
  selected,
  onItemClick,
  iconSize = 12,
}: ConfigItemButtonProps<TValue>) {
  const { value, label, labelSelected, getIconProps } = option;
  const IconComponent = option.IconComponent as React.ComponentType<{ size?: number; className?: string }>;

  const specificIconProps = getIconProps?.(value as TValue) ?? {};
  const iconEffectiveClassName = selected
    ? (option.iconSelectedClassName ??
      "text-orange-700/90 dark:text-orange-400/70")
    : (option.iconDefaultClassName ?? "");

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      className={cn(
        "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600",
        selected
          ? "z-30 bg-gray-400 shadow-sm shadow-black dark:bg-gray-700"
          : "z-10 opacity-30 hover:opacity-60",
      )}
      title={selected ? labelSelected : label}
      onClick={() => onItemClick(value as TValue)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onItemClick(value as TValue);
        }
      }}
    >
      {IconComponent && typeof IconComponent === 'function' && (
        <IconComponent
          {...specificIconProps}
          size={iconSize}
          className={iconEffectiveClassName}
        />
      )}
    </div>
  );
}
