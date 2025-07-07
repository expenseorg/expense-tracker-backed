/***
 * custom defined types used in the app
 */
import { Request } from 'express';
import { IUser } from '../models/User.model';

/**
 * Type safety for the validated req added to the request
 */
export interface ValidatedRequest<T> extends Request {
  validatedData?: T;
  userData?: IUser;
}