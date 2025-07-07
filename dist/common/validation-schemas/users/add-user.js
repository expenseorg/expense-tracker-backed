"use strict";
/**
 * this @file contains validation schemas for adding a user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserSchema = void 0;
const regex_constants_1 = require("../../constants/regex.constants");
//schema
exports.AddUserSchema = {
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
            options: [regex_constants_1.Regex.email],
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
