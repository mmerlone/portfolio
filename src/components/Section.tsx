import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps): ReactElement {
  return <section className={clsx("mb-8", className)}>{children}</section>;
}
