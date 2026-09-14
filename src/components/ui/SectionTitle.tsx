import { type ReactElement, type ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  id: string;
}

export const SectionTitle = ({
  children,
  id,
}: SectionTitleProps): ReactElement => {
  return (
    <h2
      id={id}
      className="balanced-heading editorial-section-title mb-6 pt-6 text-center text-3xl font-bold text-orange-600 md:text-4xl dark:text-orange-400"
    >
      {children}
    </h2>
  );
};
