/**
 * this file contains all the auth related controllers
 */

import { handleError } from '../common/utils/handle-error';
import User from '../models/User.model';
import { ValidatedRequest } from '../types/custom-types';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginUserValidationSchemaType } from '../common/validation-schemas/auth/login-user';

// this is used to login a user , return a access token
export const login = async (
  req: ValidatedRequest<LoginUserValidationSchemaType>,
  res: Response
) => {
  // destructure the email and password
  const { email, password } = req.validatedData!;
  try {
    // find the user using the email
    const user = await User.findOne({ email: email });

    // in case no user found
    if (!user) {
      handleError(res, {
        statusCode: 401,
        message: 'Invalid email',
      });
      return;
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      handleError(res, {
        statusCode: 401,
        message: 'Invalid password',
      });
      return;
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      message: 'Login successful',
    });
  } catch (err) {
    //handle any error thrown
    handleError(res, { error: err });
  }
};
