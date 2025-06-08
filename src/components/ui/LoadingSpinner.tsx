"use client";

import { FC } from "react";
import { cn } from "@/lib/cn";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => (
  <div className={cn("flex justify-center items-center h-full", className)}>
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);
