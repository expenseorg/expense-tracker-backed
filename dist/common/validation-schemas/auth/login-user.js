"use strict";
// validation schema user for logging in as a user
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserValidationSchema = void 0;
// schema
exports.LoginUserValidationSchema = {
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
