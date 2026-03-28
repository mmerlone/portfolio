/**
 * Isomorphic logger for utilities that run in both client and server environments
 *
 * This logger dynamically selects the appropriate logger implementation based on
 * the runtime environment. It's designed for shared utilities like timezone and
 * location detection that may be called from either context.
 *
 * Note: For code that's exclusively client or server-side, prefer importing
 * the specific logger directly for better tree-shaking and type safety.
 */

import type { Logger, LoggerContext } from "@/types/logger.types";

/**
 * Creates an isomorphic logger that works in both client and server environments
 *
 * The logger is lazily initialized to avoid importing heavy dependencies during
 * module evaluation. On first use, it detects the environment and loads the
 * appropriate logger implementation.
 *
 * @param moduleName - The name of the module for contextual logging
 * @returns Logger instance that works in both environments
 *
 * @example
 * ```typescript
 * import { buildIsomorphicLogger } from '@/lib/logger/isomorphic'
 *
 * const logger = buildIsomorphicLogger('my-utility')
 * logger.warn({ error }, 'Fallback to default value')
 * ```
 */
export function buildIsomorphicLogger(moduleName: string): Logger {
  let cachedLogger: Logger | undefined;

  const getLogger = async (): Promise<Logger> => {
    if (cachedLogger) {
      return cachedLogger;
    }

    if (typeof window === "undefined") {
      const { buildLogger } = await import("@/lib/logger/server");
      cachedLogger = buildLogger(moduleName);
    } else {
      const { buildLogger } = await import("@/lib/logger/client");
      cachedLogger = buildLogger(moduleName);
    }

    return cachedLogger;
  };

  let loggerPromise: Promise<Logger> | undefined;

  const ensureLogger = (): Promise<Logger> => {
    loggerPromise ??= getLogger();
    return loggerPromise;
  };

  const handleLoggerError = (error: unknown, logLevel: string): void => {
    if (typeof window === "undefined") {
      globalThis.console.error(`[${moduleName}] Logger initialization failed for ${logLevel}:`, error);
    }
  };

  const runLogMethod = (
    method: "trace" | "debug" | "info" | "warn" | "error" | "fatal",
    context: LoggerContext,
    message: string,
  ): void => {
    void ensureLogger()
      .then((resolvedLogger: Logger): void => {
        resolvedLogger[method](context, message);
      })
      .catch((error: unknown): void => {
        handleLoggerError(error, method);
      });
  };

  return {
    trace(context: LoggerContext, message: string): void {
      runLogMethod("trace", context, message);
    },
    debug(context: LoggerContext, message: string): void {
      runLogMethod("debug", context, message);
    },
    info(context: LoggerContext, message: string): void {
      runLogMethod("info", context, message);
    },
    warn(context: LoggerContext, message: string): void {
      runLogMethod("warn", context, message);
    },
    error(context: LoggerContext, message: string): void {
      runLogMethod("error", context, message);
    },
    fatal(context: LoggerContext, message: string): void {
      runLogMethod("fatal", context, message);
    },
    child(context: LoggerContext): Logger {
      const childLogger = buildIsomorphicLogger(moduleName);
      void ensureLogger()
        .then((resolvedLogger: Logger): void => {
          cachedLogger = resolvedLogger.child(context);
        })
        .catch((error: unknown): void => {
          handleLoggerError(error, "child");
        });
      return childLogger;
    },
  };
}
