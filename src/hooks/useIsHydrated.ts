"use client";

import { useSyncExternalStore } from "react";

function subscribe(): () => void {
  return (): void => undefined;
}

function getSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
