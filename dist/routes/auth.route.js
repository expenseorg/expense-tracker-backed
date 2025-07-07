"use strict";
/**
 * @file contains all the authentication routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const handle_validation_1 = require("../common/middlewares/handle-validation");
const login_user_1 = require("../common/validation-schemas/auth/login-user");
// initialize router
const router = (0, express_1.Router)();
// login route
router.post('/login', (0, express_validator_1.checkSchema)(login_user_1.LoginUserValidationSchema), handle_validation_1.validate, auth_controller_1.login);
//export all the auth routes
exports.default = router;
