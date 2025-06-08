"use client";

import React, { JSX } from "react";
import { ConfigIconProps } from "@/types/components";

export default function ConfigIcon<TValue extends string>({
  value,
  iconMap,
  defaultIconComponent,
  size,
  className,
  ...rest
}: ConfigIconProps<TValue>): JSX.Element | null {
  const IconToRender = ((value && iconMap[value]) ||
    defaultIconComponent) as React.ComponentType<{
    size?: number | string;
    className?: string;
  }>;
  if (!IconToRender || typeof IconToRender !== "function") return null;
  return <IconToRender size={size} className={className} {...rest} />;
}
