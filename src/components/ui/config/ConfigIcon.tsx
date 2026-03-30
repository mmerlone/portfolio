import { type ComponentType, type ElementType, type JSX } from "react";

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
  const IconToRender = (selectedIcon ?? defaultIconComponent) as ComponentType<{
    size?: number | string;
    className?: string;
  }>;
  if (!IconToRender || typeof IconToRender !== "function") return null;
  return <IconToRender size={size} className={className} {...rest} />;
}
