"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuplicateKeyError = isDuplicateKeyError;
/**
 * Checks if a given error is a duplicate key error in MongoDB.
 *
 * @param error - The error to check.
 *
 * @returns {boolean} True if the error is a duplicate key error.
 */
function isDuplicateKeyError(error) {
    var _a;
    return ((_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.code) === 11000;
}
