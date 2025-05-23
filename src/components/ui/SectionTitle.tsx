import { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-12 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
      {children}
    </h2>
  );
};
