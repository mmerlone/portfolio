import type { Logger, LoggerContext } from "@/types/logger.types";
import { createLogger } from "./shared";

const serverBaseContext: LoggerContext = {
  app: "ywybase",
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",
  // @types/node types NODE_ENV as always-defined; default it defensively in case the runtime disagrees.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  env: process.env.NODE_ENV ?? "development",
};

export const logger: Logger = createLogger(serverBaseContext, true);

export function buildLogger(moduleName: string): Logger {
  return logger.child({ module: moduleName });
}
