import { useEffect, type RefObject } from "react";

interface UseDismissOnOutsideOrEscapeOptions {
  readonly isOpen: boolean;
  readonly onDismiss: () => void;
  readonly containerRefs: readonly RefObject<HTMLElement | null>[];
}

/** Closes a disclosure widget on outside click or Escape; ignores clicks inside any given container. */
export function useDismissOnOutsideOrEscape({
  isOpen,
  onDismiss,
  containerRefs,
}: UseDismissOnOutsideOrEscapeOptions): void {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      const target = event.target as Node;
      const isInsideAnyContainer = containerRefs.some((ref) =>
        ref.current?.contains(target),
      );
      if (!isInsideAnyContainer) {
        onDismiss();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onDismiss, containerRefs]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onDismiss]);
}
