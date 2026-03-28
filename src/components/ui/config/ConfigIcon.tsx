"use client";

import { type ComponentType, type JSX } from "react";
import { type ConfigIconProps } from "@/types/components";

export default function ConfigIcon<TValue extends string>({
  value,
  iconMap,
  defaultIconComponent,
  size,
  className,
  ...rest
}: ConfigIconProps<TValue>): JSX.Element | null {
  const selectedIcon = value ? iconMap[value] : undefined;
  const IconToRender = (selectedIcon ?? defaultIconComponent) as ComponentType<{
    size?: number | string;
    className?: string;
  }>;
  if (!IconToRender || typeof IconToRender !== "function") return null;
  return <IconToRender size={size} className={className} {...rest} />;
}
