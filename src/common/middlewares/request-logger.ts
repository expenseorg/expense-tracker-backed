import chalk from 'chalk';
import { logger } from '../utils/logger';
import { Request, NextFunction, Response } from 'express';

/**
 * Express middleware to log all incoming HTTP requests.
 * Logs method, URL, IP address, and response status code.
 * The status codes are colord using chalk for better visibility
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on('finish', () => {
    // extract status code
    const status = res.statusCode;

    // define color
    // eslint-disable-next-line no-unused-vars
    let statusColor: (msg: string) => string;

    if (status >= 200 && status < 300) {
      // we show green for success message
      statusColor = chalk.green;
    } else if (status >= 400) {
      // we show red for failed messages
      statusColor = chalk.red;
    } else {
      // other 3XX codes are shown in yellow
      statusColor = chalk.yellow;
    }

    logger.info(
      `${req.method} ${req.originalUrl} from ${req.ip} - ${statusColor(res.statusCode.toString())}`
    );
  });
  next();
};
