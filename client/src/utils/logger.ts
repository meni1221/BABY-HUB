export const logger = {
  info: (message: string, meta?: unknown) => {
    console.info(`[INFO] ${message}`, meta ?? "");
  },
  warn: (message: string, meta?: unknown) => {
    console.warn(`[WARN] ${message}`, meta ?? "");
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? "");
  },
};
