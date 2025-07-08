import { Response } from 'express';
import { logger } from './logger';

// types ....
type HandleErrorOptions = {
  statusCode?: number;
  message?: string;
  error?: any; // Optional: can be Error or any error object this is only for logging
};

/**
 * Standard messages for common HTTP status codes.
 */
const statusMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  500: 'Server down please try after some time',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  // and additional status to be added
};

/**
 * Centralized error response handler.
 * @param res - Express Response object
 * @param options - Error response options
 */
export const handleError = (res: Response, options: HandleErrorOptions) => {
  // by default status code will be 500
  const statusCode = options?.statusCode ?? 500;
  // set default message configured above
  const message = options?.message ?? statusMessages[statusCode];
  //logger for dev mode
  if (process.env.NODE_ENV === 'development' && options?.error) {
    logger.error(JSON.stringify(options?.error, null, 2));
  }

  // handle error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};