import { type FC } from "react";
import { cn } from "@/lib/cn";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => (
  <div className={cn("flex h-full items-center justify-center", className)}>
    <div className="border-accent h-8 w-8 animate-spin rounded-full border-t-2 border-b-2"></div>
  </div>
);
