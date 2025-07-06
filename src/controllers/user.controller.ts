/**
 * @file contains all the controllers related to user
 */

import { Response } from 'express';
import User from '../models/User.model';
import { handleError } from '../common/utils/handle-error';
import { AddUserSchemaType } from '../common/validation-schemas/users/add-user';
import { ValidatedRequest } from '../types/custom-types';
import { isDuplicateKeyError } from '../common/utils/mongo-errors';

export const getUser = (req: ValidatedRequest<{}>, res: Response) => {
  try {
    // send the validated user
    res.status(200).json({
      success: true,
      data: req.userData,
    });
  } catch (err) {
    // this is just kept as a fail safe
    handleError(res, {
      error: err,
    });
  }
};

/**
 * Adds a new user to the database
 */
export const addUser = async (
  req: ValidatedRequest<AddUserSchemaType>,
  res: Response
) => {
  // get the data from validated data
  const validatedRequest = req.validatedData!;

  try {
    // create a new user
    const newUser = new User(validatedRequest);
    // save the user
    const savedUser = await newUser.save();

    // in case the user was not saved
    if (!savedUser) {
      handleError(res, { message: 'User creation failed' });
      return;
    }
    // else send the res
    res.status(201).send({
      success: true,
      data: savedUser,
      message: 'User created successfully',
    });
  } catch (err) {
    handleError(res, {
      message: isDuplicateKeyError(err)
        ? 'User already exists'
        : 'User creation failed',
      error: err,
    });
  }
};
