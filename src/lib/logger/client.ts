import type { Logger } from "@/types/logger.types";
import { createLogger } from "./shared";

const isProduction = process.env.NODE_ENV === "production";
const isEdgeRuntime = typeof process !== "undefined" && process.env?.NEXT_RUNTIME === "edge";
const shouldEnableLogging = !isProduction || isEdgeRuntime;

export const logger: Logger = createLogger({}, shouldEnableLogging);

export function buildLogger(moduleName: string): Logger {
  return logger.child({ module: moduleName });
}
