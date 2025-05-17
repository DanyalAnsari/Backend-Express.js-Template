import winston from "winston";
import fs from "fs";

// Create logs directory if it doesn't exist
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

// Correct print format implementation
const { format } = winston;
const print = format.printf(({ timestamp, level, message }) => {
  const msg =
    typeof message === "object" ? JSON.stringify(message, null, 2) : message;
  return `${timestamp} ${level}: ${msg}`;
});

// Correct format combinations
const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  print
);

const fileFormat = format.combine(format.timestamp(), format.json(), print);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Handle uncaught exceptions
logger.exceptions.handle(
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

export default logger;