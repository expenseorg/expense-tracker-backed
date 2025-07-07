"use strict";
/**
 * @file contains all the controllers related to user
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
exports.updateUser = exports.deleteUser = exports.addUser = exports.getUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const handle_error_1 = require("../common/utils/handle-error");
const mongo_errors_1 = require("../common/utils/mongo-errors");
const hashing_1 = require("../common/utils/hashing");
/**
 * Route to get the user details
 */
const getUser = (req, res) => {
    var _a, _b, _c, _d, _e;
    try {
        // send the validated user
        res.status(200).json({
            success: true,
            data: {
                _id: (_a = req.userData) === null || _a === void 0 ? void 0 : _a._id,
                name: (_b = req.userData) === null || _b === void 0 ? void 0 : _b.name,
                email: (_c = req.userData) === null || _c === void 0 ? void 0 : _c.email,
                walletBalance: (_d = req.userData) === null || _d === void 0 ? void 0 : _d.walletBalance,
                profileImg: (_e = req.userData) === null || _e === void 0 ? void 0 : _e.profileImg
            },
        });
    }
    catch (err) {
        // this is just kept as a fail safe
        (0, handle_error_1.handleError)(res, {
            error: err,
        });
    }
};
exports.getUser = getUser;
/**
 * Adds a new user to the database
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from validated data
    const validatedRequest = req.validatedData;
    try {
        // create a new user
        const newUser = new User_model_1.default(validatedRequest);
        // save the user
        const savedUser = yield newUser.save();
        // in case the user was not saved
        if (!savedUser) {
            (0, handle_error_1.handleError)(res, { message: 'User creation failed' });
            return;
        }
        // else send the res
        res.status(201).json({
            success: true,
            data: savedUser,
            message: 'User created successfully',
        });
    }
    catch (err) {
        (0, handle_error_1.handleError)(res, {
            message: (0, mongo_errors_1.isDuplicateKeyError)(err)
                ? 'User already exists'
                : 'User creation failed',
            error: err,
        });
    }
});
exports.addUser = addUser;
// this route is used to delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // delete the user
        const deletedUser = yield User_model_1.default.deleteOne({ _id: req.userData._id });
        // in case the user was not deleted
        if (!deletedUser) {
            (0, handle_error_1.handleError)(res, { message: 'User deletion failed' });
            return;
        }
        // else send the res
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    }
    catch (err) {
        // handle any unexpected error
        (0, handle_error_1.handleError)(res, {
            error: err,
        });
    }
});
exports.deleteUser = deleteUser;
// update user details
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from validated data
    const validatedRequest = req.validatedData;
    try {
        // in case we are updating password
        if (validatedRequest === null || validatedRequest === void 0 ? void 0 : validatedRequest.password) {
            validatedRequest.password = yield (0, hashing_1.encrypt)(validatedRequest.password);
        }
        //update the user
        const updatedUser = yield User_model_1.default.findOneAndUpdate({ _id: req.userData._id }, validatedRequest, { new: true } // return the updated user
        );
        if (!updatedUser) {
            (0, handle_error_1.handleError)(res, { message: 'User update failed' });
            return;
        }
        // else send the res
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully',
        });
    }
    catch (err) {
        // catch any un expected error
        (0, handle_error_1.handleError)(res, { error: err });
    }
});
exports.updateUser = updateUser;
