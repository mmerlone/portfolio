import {
  LogLevelEnum,
  type LogLevel,
  type Logger,
  type LoggerContext,
  type SerializedError,
} from "@/types/logger.types";
import { maskEmail } from "./utils";

function serializeError(error: Error): SerializedError {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
  };
}

function normalizeContext(context: LoggerContext): LoggerContext {
  const entries = Object.entries(context).map(([key, value]): [string, unknown] => {
    if (key === "email" && typeof value === "string") {
      return [key, maskEmail(value)];
    }

    if (key === "err" && value instanceof Error) {
      return [key, serializeError(value)];
    }

    return [key, value];
  });

  return Object.fromEntries(entries);
}

function formatContextValue(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (value instanceof Error) {
    return JSON.stringify(serializeError(value));
  }

  const serialized = JSON.stringify(value);
  return serialized ?? JSON.stringify(String(value));
}

function formatContext(context: LoggerContext): string {
  return Object.keys(context)
    .sort()
    .map((key): string => `${key}=${formatContextValue(context[key])}`)
    .join(" ");
}

function writeToConsole(level: LogLevel, message: string): void {
  switch (level) {
    case LogLevelEnum.TRACE:
    case LogLevelEnum.DEBUG:
      globalThis.console.debug(message);
      break;
    case LogLevelEnum.INFO:
      globalThis.console.info(message);
      break;
    case LogLevelEnum.WARN:
      globalThis.console.warn(message);
      break;
    case LogLevelEnum.ERROR:
    case LogLevelEnum.FATAL:
      globalThis.console.error(message);
      break;
  }
}

export function createLogger(baseContext: LoggerContext = {}, isEnabled = true): Logger {
  function log(level: LogLevel, context: LoggerContext, message: string): void {
    if (!isEnabled) {
      return;
    }

    const mergedContext = normalizeContext({ ...baseContext, ...context });
    const timestamp = new Date().toISOString();
    const formattedContext = formatContext(mergedContext);
    const logLine = formattedContext
      ? `[${timestamp}] ${level} ${message} ${formattedContext}`
      : `[${timestamp}] ${level} ${message}`;

    writeToConsole(level, logLine);
  }

  return {
    trace(context: LoggerContext, message: string): void {
      log(LogLevelEnum.TRACE, context, message);
    },
    debug(context: LoggerContext, message: string): void {
      log(LogLevelEnum.DEBUG, context, message);
    },
    info(context: LoggerContext, message: string): void {
      log(LogLevelEnum.INFO, context, message);
    },
    warn(context: LoggerContext, message: string): void {
      log(LogLevelEnum.WARN, context, message);
    },
    error(context: LoggerContext, message: string): void {
      log(LogLevelEnum.ERROR, context, message);
    },
    fatal(context: LoggerContext, message: string): void {
      log(LogLevelEnum.FATAL, context, message);
    },
    child(context: LoggerContext): Logger {
      return createLogger({ ...baseContext, ...context }, isEnabled);
    },
  };
}
