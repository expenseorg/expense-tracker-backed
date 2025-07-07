import { Schema } from 'express-validator';

export const AddExpenseSchema: Schema = {
  title: {
    isString: {
      errorMessage: 'Name should be a string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  price: {
    isNumeric: {
      errorMessage: 'Entered price should be a number',
    },
    notEmpty: {
      errorMessage: 'price is required',
    },
  },
  category: {
    isString: {
      errorMessage: 'this should be a string',
    },
  },
  date: {
    isISO8601: {
      errorMessage: 'Date must be in ISO 8601 format',
    },
  },
  user: {
    isMongoId: {
      errorMessage: 'User must be a valid MongoDB ObjectId',
    },
    notEmpty: {
      errorMessage: 'User ID is required',
    },
  },
};
