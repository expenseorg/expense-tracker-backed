"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = __importDefault(require("./jwt.strategy"));
// initialize all the strategies
(0, jwt_strategy_1.default)(passport_1.default);
exports.default = passport_1.default;
