"use client";

import React from "react";

// Type Definitions
export interface ConfigOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface ConfigToggleProps<T extends string> {
  options: ConfigOption[];
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
    <div className="config-toggle" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={option.value === currentValue}
          onClick={() => onValueChange(option.value as T)}
          className={`config-toggle-option ${option.value === currentValue ? "active" : ""}`}
        >
          {option.icon && <option.icon className="config-toggle-icon" />}
          <span className="config-toggle-label">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
