import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * A small inline label, used for technology and skill tags. Replaces the
 * `inline-block rounded px-2 py-1 text-xs` recipe previously repeated in five
 * files.
 */
const badgeVariants = cva(
  "inline-block rounded-md border border-transparent text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        accent: "bg-primary/15 text-primary",
        outline: "border-border bg-card text-muted-foreground",
        destructive: "bg-destructive/15 text-destructive",
      },
      size: {
        sm: "px-1.5 py-0.5",
        default: "px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  ...props
}: ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>): ReactElement {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge };
