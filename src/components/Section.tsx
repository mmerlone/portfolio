import type { ReactElement, ReactNode } from "react";
interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps): ReactElement {
  return <section className={`mb-8 ${className ?? ""}`}>{children}</section>;
}
