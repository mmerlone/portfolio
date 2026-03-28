export interface SerializedError {
  message: string;
  name: string;
  stack?: string;
}

export interface LoggerContext {
  email?: string;
  err?: Error | SerializedError;
  module?: string;
  [key: string]: unknown;
}

export const LogLevelEnum = {
  TRACE: "trace",
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal",
} as const;

export type LogLevel = (typeof LogLevelEnum)[keyof typeof LogLevelEnum];

export type LoggerMethod = (context: LoggerContext, message: string) => void;

export interface Logger {
  trace: LoggerMethod;
  debug: LoggerMethod;
  info: LoggerMethod;
  warn: LoggerMethod;
  error: LoggerMethod;
  fatal: LoggerMethod;
  child: (context: LoggerContext) => Logger;
}
