// jest-dom adds custom jest matchers for asserting on DOM nodes.
require("@testing-library/jest-dom");

// Register jest-axe's `toHaveNoViolations` matcher for a11y assertions.
require("jest-axe/extend-expect");

// jsdom implements no layout engine and does not provide `matchMedia`, which
// components use to react to CSS breakpoints. This stub reports a query as
// never matching and never fires `change`; tests that need a specific
// breakpoint must override `window.matchMedia` with a controllable stub.
// Guarded on `window` itself because some suites run in the `node`
// environment, where there is no DOM at all.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  });
}

// jsdom also omits `PointerEvent`, which every browser implements. Base UI
// re-dispatches a synthetic pointer click from its switch/checkbox handlers
// (`dispatchClickWithModifiers`), so activating them throws
// "PointerEvent is not a constructor" under jsdom. `MouseEvent` supplies the
// same interface Base UI reads (`clientX`/`clientY`/`ctrlKey`/…), and
// `fireEvent.pointerDown`/`.pointerUp` also construct `PointerEvent`, so those
// must fall back to `MouseEvent` too. Guarded on `window` for the `node`
// environment, as above.
if (
  typeof window !== "undefined" &&
  typeof window.PointerEvent !== "function"
) {
  class PointerEventPolyfill extends window.MouseEvent {
    constructor(type, params = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? "mouse";
      this.isPrimary = params.isPrimary ?? true;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0;
    }
  }

  window.PointerEvent = PointerEventPolyfill;
  globalThis.PointerEvent = PointerEventPolyfill;
}
