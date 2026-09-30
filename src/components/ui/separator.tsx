import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "cn";
/**
 * A thin horizontal rule. Replaces the hand-written `<hr>` with hardcoded
 * border colors.
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: ComponentPropsWithoutRef<"hr"> & {
  orientation?: "horizontal" | "vertical";
}): ReactElement {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "bg-border shrink-0 border-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
export { Separator };
