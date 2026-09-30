"use client";

import type { ReactElement } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";

function ProgressTrack({
  className,
  ...props
}: ProgressPrimitive.Track.Props): ReactElement {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "bg-muted relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props): ReactElement {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("bg-primary h-full transition-all", className)}
      {...props}
    />
  );
}

function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props): ReactElement {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
