/**
 * @file Middleware to handle validation results from express-validator
 */

import { Request, Response, NextFunction } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { handleError } from '../utils/handle-error';

/**
 * Middleware to check validation results and return errors if any
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(res, {
      statusCode: 400,
      // error message is consists of all the errors
      message: errors
        .array()
        .map((err) => err.msg)
        .join(' | '),
      error: errors.array(), // log complete error in dev mode
    });
  }
  // set matched data
  // @ts-ignore
  req.validatedData = matchedData(req);
  next();
};