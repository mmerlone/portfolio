import { type ReactElement, type ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps): ReactElement => {
  return (
    <h2 className="mb-6 pt-6 text-center text-3xl font-bold text-orange-600 md:text-4xl dark:text-orange-400">
      {children}
    </h2>
  );
};
