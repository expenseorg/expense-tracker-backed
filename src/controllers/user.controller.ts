/**
 * @file contains all the controllers related to user
 */

import { Response } from 'express';
import User from '../models/User.model';
import { handleError } from '../common/utils/handle-error';
import { AddUserSchemaType } from '../common/validation-schemas/users/add-user';
import { ValidatedRequest } from '../types/custom-types';
import { isDuplicateKeyError } from '../common/utils/mongo-errors';
import { UpdateUserSchemaType } from '../common/validation-schemas/users/update-user';
import { encrypt } from '../common/utils/hashing';

/**
 * Route to get the user details
 */
export const getUser = (req: ValidatedRequest<{}>, res: Response) => {
  try {
    // send the validated user
    res.status(200).json({
      success: true,
      data: {
        _id: req.userData?._id,
        name: req.userData?.name,
        email: req.userData?.email,
        walletBalance: req.userData?.walletBalance,
        profileImg: req.userData?.profileImg
      },
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

// this route is used to delete a user
export const deleteUser = async (req: ValidatedRequest<{}>, res: Response) => {
  try {
    // delete the user
    const deletedUser = await User.deleteOne({ _id: req.userData!._id });

    // in case the user was not deleted
    if (!deletedUser) {
      handleError(res, { message: 'User deletion failed' });
      return;
    }
    // else send the res
    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    // handle any unexpected error
    handleError(res, {
      error: err,
    });
  }
};

// update user details
export const updateUser = async (
  req: ValidatedRequest<UpdateUserSchemaType>,
  res: Response
) => {
  // get the data from validated data
  const validatedRequest = req.validatedData!;

  try {
    // in case we are updating password
    if (validatedRequest?.password) {
      validatedRequest.password = await encrypt(validatedRequest.password);
    }

    //update the user
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userData!._id },
      validatedRequest,
      { new: true } // return the updated user
    );

    if (!updatedUser) {
      handleError(res, { message: 'User update failed' });
      return;
    }

    // else send the res
    res.status(200).send({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (err) {
    // catch any un expected error
    handleError(res, { error: err });
  }
};
