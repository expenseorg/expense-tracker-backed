/**
 * this @file contains validation schemas for adding a user
 */

import { Types } from 'mongoose';
import { Regex } from '../../constants/regex.constants';
import { Schema } from 'express-validator';

// type
export type AddUserSchemaType = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profileImg?: string;
  walletBalance?: number;
};

//schema
export const AddUserSchema: Schema = {
  name: {
    isString: {
      errorMessage: 'Name should be a string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  email: {
    isString: {
      errorMessage: 'Email should be a string',
    },
    notEmpty: {
      errorMessage: 'Email is required',
    },
    matches: {
      options: [Regex.email],
      errorMessage: 'Email is not valid',
    },
  },
  password: {
    isString: {
      errorMessage: 'Password should be a string',
    },
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
  profileImg: {
    optional: true,
    isString: {
      errorMessage: 'Profile image should be url string',
    },
  },
  walletBalance: {
    isNumeric: {
      errorMessage: 'Wallet balance should be a number',
    },
    optional: true,
  },
};
