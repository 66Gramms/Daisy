// logger.ts

type LogLevel = "debug" | "info" | "warn" | "error";

interface LoggerOptions {
  level?: LogLevel;
  showTimestamp?: boolean;
  useColors?: boolean;
  context?: string;
}

const levelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function colorize(level: LogLevel, msg: string): string {
  const colors: Record<LogLevel, string> = {
    debug: "\x1b[90m", // gray
    info: "\x1b[36m", // cyan
    warn: "\x1b[33m", // yellow
    error: "\x1b[31m", // red
  };
  return `${colors[level]}${msg}\x1b[0m`;
}

function createLogger(options: LoggerOptions = {}) {
  const {
    level = "debug",
    showTimestamp = true,
    useColors = true,
    context = "",
  } = options;

  function log(lvl: LogLevel, ...args: any[]) {
    if (levelPriority[lvl] < levelPriority[level]) return;

    const timestamp = showTimestamp ? `[${new Date().toISOString()}] ` : "";
    const ctx = context ? `[${context}] ` : "";
    const header = `${timestamp}${lvl.toUpperCase()} ${ctx}`;

    const output = useColors ? colorize(lvl, header) : header;
    console.log(output, ...args);
  }

  return {
    debug: (...args: any[]) => log("debug", ...args),
    info: (...args: any[]) => log("info", ...args),
    warn: (...args: any[]) => log("warn", ...args),
    error: (...args: any[]) => log("error", ...args),
  };
}

// Default root logger
export const logger = createLogger();

// Scoped logger factory
export const createContextLogger = (context: string, level?: LogLevel) =>
  createLogger({ context, level });
