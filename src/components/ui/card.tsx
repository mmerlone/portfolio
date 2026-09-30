import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
/**
 * A bordered content surface. Built on a plain element with token colors so the
 * light and dark schemes come from one place, replacing the
 * `border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800` recipe that
 * was previously repeated in eleven files.
 */
const cardVariants = cva(
  "rounded-lg border border-border bg-card transition-colors hover:border-primary/40 focus-within:border-primary/40",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  },
);
function Card({
  className,
  padding,
  ...props
}: ComponentPropsWithoutRef<"article"> &
  VariantProps<typeof cardVariants>): ReactElement {
  return (
    <article
      className={cn(
        cardVariants({ padding }),
        "text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}
export { Card, cardVariants };
