import { type ReactElement, type ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps): ReactElement => {
  return (
    <h2 className="balanced-heading editorial-section-title text-accent mb-6 pt-6 text-center text-3xl font-bold md:text-4xl">
      {children}
    </h2>
  );
};
