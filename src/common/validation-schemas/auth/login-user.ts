// validation schema user for logging in as a user

// type
export type LoginUserValidationSchemaType = {
  email: string;
  password: string;
};
// schema
export const LoginUserValidationSchema = {
  email: {
    isString: {
      errorMessage: 'Email should be a string',
    },
    notEmpty: {
      errorMessage: 'Email is required',
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
};
