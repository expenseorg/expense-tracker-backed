/**
 * this @file contains validation schemas for updating a user
 */

import { Regex } from '../../constants/regex.constants';
import { Schema } from 'express-validator';

// type
export type UpdateUserSchemaType = {
  name?: string;
  email?: string;
  password?: string;
  profileImg?: string;
  walletBalance?: number;
};

//schema
export const UpdateUserSchema: Schema = {
  name: {
    optional: true,
    isString: {
      errorMessage: 'Name should be a string',
    },
  },
  email: {
    optional: true,
    isString: {
      errorMessage: 'Email should be a string',
    },
    matches: {
      options: [Regex.email],
      errorMessage: 'Email is not valid',
    },
  },
  password: {
    optional: true,
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
  _: {
    custom: {
      /**
       * Checks if at least one of the optional felids are provided
       */
      options: (_, { req }) => {
        if (
          !req.body.name &&
          !req.body.email &&
          !req.body.password &&
          !req.body.walletBalance &&
          !req.body.profileImg
        ) {
          return false;
        }
        return true;
      },
      errorMessage: 'Please provide at least one field to update',
    },
  },
};
