import { createElement, type ElementType, type JSX } from "react";

export interface ConfigIconProps<TValue extends string> {
  value?: TValue;
  iconMap: Partial<Record<TValue, ElementType>>;
  defaultIconComponent?: ElementType;
  size?: number | string;
  className?: string;
  [key: string]: unknown;
}

export default function ConfigIcon<TValue extends string>({
  value,
  iconMap,
  defaultIconComponent,
  size,
  className,
  ...rest
}: ConfigIconProps<TValue>): JSX.Element | null {
  const selectedIcon = value ? iconMap[value] : undefined;
  const IconToRender = selectedIcon ?? defaultIconComponent;

  if (!IconToRender) return null;

  return createElement(IconToRender, {
    size,
    className,
    ...rest,
  });
}
