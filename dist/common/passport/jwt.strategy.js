"use strict";
/**
 * @file holds the passport middleware for jwt token based strategy
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
const passport_jwt_1 = require("passport-jwt");
const User_model_1 = __importDefault(require("../../models/User.model"));
const dotenv_1 = __importDefault(require("dotenv"));
// configure .env
dotenv_1.default.config();
// passport middleware for jwt
exports.default = (passport) => {
    passport.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'super-secret',
    }, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // find user by id
            const user = yield User_model_1.default.findById(jwtPayload.id).lean().exec();
            if (!user)
                return done(null, false);
            // in no error return the user
            return done(null, user);
        }
        catch (err) {
            return done(err, false);
        }
    })));
};
