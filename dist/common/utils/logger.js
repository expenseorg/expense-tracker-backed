"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// daily archiving and rotating config
const dailyRotateTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '2d', // Only keep logs for the last 2 days
});
//logger function
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(
    // Colorizing logs for console output
    winston_1.format.colorize(), 
    // Adding timestamp and custom format for each log level
    winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)),
    transports: [
        new winston_1.transports.Console({
            // If you want to make sure the console output uses colors
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple() // Simple format for colored logs
            ),
        }),
        dailyRotateTransport,
    ],
});
// Exporting the logger for use in other parts of the application only if in development mode
const devLogger = (message) => {
    if (process.env.NODE_ENV === 'development') {
        exports.logger.info(message);
    }
};
exports.devLogger = devLogger;
