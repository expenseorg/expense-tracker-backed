"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("../utils/logger");
/**
 * Express middleware to log all incoming HTTP requests.
 * Logs method, URL, IP address, and response status code.
 * The status codes are colord using chalk for better visibility
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const requestLogger = (req, res, next) => {
    res.on('finish', () => {
        // extract status code
        const status = res.statusCode;
        // define color
        // eslint-disable-next-line no-unused-vars
        let statusColor;
        if (status >= 200 && status < 300) {
            // we show green for success message
            statusColor = chalk_1.default.green;
        }
        else if (status >= 400) {
            // we show red for failed messages
            statusColor = chalk_1.default.red;
        }
        else {
            // other 3XX codes are shown in yellow
            statusColor = chalk_1.default.yellow;
        }
        logger_1.logger.info(`${req.method} ${req.originalUrl} from ${req.ip} - ${statusColor(res.statusCode.toString())}`);
    });
    next();
};
exports.requestLogger = requestLogger;
