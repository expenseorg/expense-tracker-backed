/***
 * custom defined types used in the app
 */
import { Request } from 'express';

/**
 * Type safety for the validated req added to the request
 */
export interface ValidatedRequest<T> extends Request {
  validatedData?: T;
}