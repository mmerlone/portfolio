import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps): React.ReactElement {
  return <div className={clsx("mb-8", className)}>{children}</div>;
}
