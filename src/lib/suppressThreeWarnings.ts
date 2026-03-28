/**
 * Suppresses specific Three.js deprecation warnings.
 *
 * This utility filters out the THREE.Clock deprecation warning that is triggered
 * by @react-three/fiber's internal usage of the deprecated Clock API.
 *
 * The warning is: "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead."
 *
 * This is a temporary workaround until @react-three/fiber updates to use THREE.Timer.
 */

import { setConsoleFunction } from "three";

// Store the original console.warn function
// eslint-disable-next-line no-console
const originalWarn = console.warn;

// Set up a custom console function to filter out specific warnings
setConsoleFunction(
  (type: string, message: string, ...params: unknown[]): void => {
    if (type === "warn" && typeof message === "string") {
      // Filter out the THREE.Clock deprecation warning
      if (message.includes("THREE.Clock: This module has been deprecated")) {
        return; // Suppress this specific warning
      }
    }

    // For all other warnings, use the original console.warn
    if (type === "warn") {
      originalWarn(message, ...params);
    } else if (type === "error") {
      // eslint-disable-next-line no-console
      console.error(message, ...params);
    } else {
      // eslint-disable-next-line no-console
      console.log(message, ...params);
    }
  },
);
