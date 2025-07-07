"use strict";
/**
 * this @file contains validation schemas for updating a user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = void 0;
const regex_constants_1 = require("../../constants/regex.constants");
//schema
exports.UpdateUserSchema = {
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
            options: [regex_constants_1.Regex.email],
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
                if (!req.body.name &&
                    !req.body.email &&
                    !req.body.password &&
                    !req.body.walletBalance &&
                    !req.body.profileImg) {
                    return false;
                }
                return true;
            },
            errorMessage: 'Please provide at least one field to update',
        },
    },
};
