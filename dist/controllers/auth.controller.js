"use strict";
/**
 * this file contains all the auth related controllers
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const handle_error_1 = require("../common/utils/handle-error");
const User_model_1 = __importDefault(require("../models/User.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_constants_1 = require("../common/constants/config.constants");
// this is used to login a user , return a access token
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure the email and password
    const { email, password } = req.validatedData;
    try {
        // find the user using the email
        const user = yield User_model_1.default.findOne({ email: email });
        // in case no user found
        if (!user) {
            (0, handle_error_1.handleError)(res, {
                statusCode: 401,
                message: 'Invalid email',
            });
            return;
        }
        // compare passwords
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            (0, handle_error_1.handleError)(res, {
                statusCode: 401,
                message: 'Invalid password',
            });
            return;
        }
        // generate token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: config_constants_1.JWT_EXPIRATION_TIME,
        });
        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            message: 'Login successful',
        });
    }
    catch (err) {
        //handle any error thrown
        (0, handle_error_1.handleError)(res, { error: err });
    }
});
exports.login = login;
