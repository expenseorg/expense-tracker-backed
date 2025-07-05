import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// daily archiving and rotating config
const dailyRotateTransport = new DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '2d', // Only keep logs for the last 2 days
});

//logger function
export const logger = createLogger({
  level: 'info',
  format: format.combine(
    // Colorizing logs for console output
    format.colorize(),

    // Adding timestamp and custom format for each log level
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.Console({
      // If you want to make sure the console output uses colors
      format: format.combine(
        format.colorize(),
        format.simple() // Simple format for colored logs
      ),
    }),
    dailyRotateTransport,
  ],
});

// Exporting the logger for use in other parts of the application only if in development mode
export const devLogger = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(message);
  }
};