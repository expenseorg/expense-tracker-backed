"use strict";
/**
 * This file contains all the upload related routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../common/middlewares/require-auth");
const multer_config_1 = require("../common/config/multer.config");
const upload_controller_1 = require("../controllers/upload.controller");
//initializer router
const router = (0, express_1.Router)();
// Route to upload image
router.post('/image', require_auth_1.requireAuth, multer_config_1.uploadImageMulter.single('image'), upload_controller_1.uploadImage);
// export clubbed routes
exports.default = router;
