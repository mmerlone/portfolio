"use client";

export const HeroEffect = (): React.ReactElement => {
  return (
    <div className="h-full hero-effect bg-gradient-to-br from-indigo-50/90 via-gray-400 to-orange-300 dark:from-gray-900/90 dark:via-gray-900 dark:to-orange-900/90">
      <div className="hero-background absolute inset-0 opacity-90 dark:opacity-20"></div>
    </div>
  );
};
