"use strict";
/**
 * this file contains all the user related routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
const add_user_1 = require("../common/validation-schemas/users/add-user");
const handle_validation_1 = require("../common/middlewares/handle-validation");
const require_auth_1 = require("../common/middlewares/require-auth");
const update_user_1 = require("../common/validation-schemas/users/update-user");
// initialize router
const router = (0, express_1.Router)();
// get a single  user detail
router.get('/', require_auth_1.requireAuth, user_controller_1.getUser);
// add a single user
router.post('/', (0, express_validator_1.checkSchema)(add_user_1.AddUserSchema), handle_validation_1.validate, user_controller_1.addUser);
// delete a user
router.delete('/', require_auth_1.requireAuth, user_controller_1.deleteUser);
// update a user
router.patch('/', require_auth_1.requireAuth, (0, express_validator_1.checkSchema)(update_user_1.UpdateUserSchema), handle_validation_1.validate, user_controller_1.updateUser);
// export all the user Routes
exports.default = router;
