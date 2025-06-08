"use client";

import React from "react";
import { ConfigIconProps } from "@/types/components";
import { cn } from "@/lib/cn";

// Type Definitions
export interface ConfigOption<T extends string = string> {
  value: T;
  label: string;
  labelSelected?: string;
  IconComponent?: React.ComponentType<ConfigIconProps<T>>;
  getIconProps?: (value: T) => {
    value: T;
    iconMap: Partial<Record<T, React.ElementType>>;
    defaultIconComponent?: React.ElementType;
  };
}

interface ConfigToggleProps<T extends string> {
  options: ConfigOption<T>[];
  currentValue: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
}

export function ConfigToggle<T extends string>({
  options,
  currentValue,
  onValueChange,
  ariaLabel,
}: ConfigToggleProps<T>) {
  return (
    <div
      className="config-toggle m-1 flex flex-row gap-1 rounded-full inset-shadow-sm inset-shadow-black/30 dark:inset-shadow-black/70"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "config-toggle-option m-1 rounded-full p-1 shadow-md shadow-black/50 outline-1 outline-gray-100 dark:outline-gray-300/30 cursor-pointer",
            option.value === currentValue &&
              "active bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700",
          )}
        >
          <input
            type="radio"
            name={ariaLabel}
            value={option.value}
            checked={option.value === currentValue}
            onChange={() => onValueChange(option.value as T)}
            className="sr-only"
          />
          {option.IconComponent && option.getIconProps && (
            <option.IconComponent
              {...option.getIconProps(option.value)}
              className={cn(
                "config-toggle-icon",
                option.value === currentValue &&
                  "text-orange-500 dark:text-orange-400",
              )}
              title={option.label}
            />
          )}
        </label>
      ))}
    </div>
  );
}
