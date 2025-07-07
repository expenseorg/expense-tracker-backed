"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const index_1 = __importDefault(require("../passport/index"));
const handle_error_1 = require("../utils/handle-error");
/**
 * Middleware to protect routes from unauthorized access.
 * It uses passport-jwt strategy to validate the JWT token.
 * If the token is invalid or missing, it returns a 401 Unauthorized response.
 * If the token is valid, it attaches the user details to the req object.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const requireAuth = (req, res, next) => {
    index_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return (0, handle_error_1.handleError)(res, {
                statusCode: 401,
                message: 'Unauthorized login is required',
            });
        }
        // set authenticated user
        // @ts-ignore
        req.userData = user;
        next();
    })(req, res, next);
};
exports.requireAuth = requireAuth;
