import passport from '../passport/index';
import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/handle-error';
import { IUser } from '../../models/User.model';

/**
 * Middleware to protect routes from unauthorized access.
 * It uses passport-jwt strategy to validate the JWT token.
 * If the token is invalid or missing, it returns a 401 Unauthorized response.
 * If the token is valid, it attaches the user details to the req object.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: object, user: IUser) => {
      if (err || !user) {
        return handleError(res, {
          statusCode: 401,
          message: 'Unauthorized login is required',
        });
      }
      // set authenticated user
      // @ts-ignore
      req.userData = user;
      next();
    }
  )(req, res, next);
};
