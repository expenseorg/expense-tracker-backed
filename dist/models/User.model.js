"use strict";
/**
 * This contains the user model
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const regex_constants_1 = require("../common/constants/regex.constants");
const hashing_1 = require("../common/utils/hashing");
// schema
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: regex_constants_1.Regex.email,
        unique: true,
    },
    profileImg: {
        type: String,
        required: false,
        default: '',
    },
    walletBalance: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });
/**
 * Pre-save hook to hash the password if it is modified.
 */
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // if not modified, skip
        if (!this.isModified('password'))
            return next();
        // else we has the password
        const hashedPassword = yield (0, hashing_1.encrypt)(this.password);
        this.password = hashedPassword;
        // call next once done
        next();
    });
});
// create model from the schema and export
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
