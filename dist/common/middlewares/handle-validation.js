"use strict";
/**
 * @file Middleware to handle validation results from express-validator
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const handle_error_1 = require("../utils/handle-error");
/**
 * Middleware to check validation results and return errors if any
 */
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return (0, handle_error_1.handleError)(res, {
            statusCode: 400,
            // error message is consists of all the errors
            message: errors
                .array()
                .map((err) => err.msg)
                .join(' | '),
            error: errors.array(), // log complete error in dev mode
        });
    }
    // set matched data
    // @ts-ignore
    req.validatedData = (0, express_validator_1.matchedData)(req);
    next();
};
exports.validate = validate;
