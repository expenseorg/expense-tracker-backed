"use strict";
/**
 * This will combine all the routes to be imported in the index
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const expense_route_1 = __importDefault(require("./expense.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
// initialize router
const route = (0, express_1.Router)();
// user Route
route.use('/users', user_route_1.default);
// auth Route
route.use('/auth', auth_route_1.default);
//expense Route
route.use('/expenses', expense_route_1.default);
// Upload routes
route.use('/uploads', upload_route_1.default);
// export all the routes
exports.default = route;
