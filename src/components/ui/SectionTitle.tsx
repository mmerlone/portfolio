import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 pt-6 mb-6 text-center">
      {children}
    </h2>
  );
};
