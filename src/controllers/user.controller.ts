/**
 * @file contains all the controllers related to user
 */

import { Response } from 'express';
import User from '../models/User.model';
import { handleError } from '../common/utils/handle-error';
import { AddUserSchemaType } from '../common/validation-schemas/users/add-user';
import { ValidatedRequest } from '../types/custom-types';
import { isDuplicateKeyError } from '../common/utils/mongo-errors';

export const getUser = (_, res: Response) => {
  res.send('get all users');
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
    console.log(savedUser);
    // else send the res
    res.status(201).send({
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
