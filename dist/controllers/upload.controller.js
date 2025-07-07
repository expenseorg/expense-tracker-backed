"use strict";
/**
 * This file contains all the upload related routes
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
exports.uploadImage = void 0;
const cloudinary_config_1 = __importDefault(require("../common/config/cloudinary.config"));
const promises_1 = __importDefault(require("fs/promises"));
const handle_error_1 = require("../common/utils/handle-error");
/**
 * Controller to upload image
 */
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        // Upload image to Cloudinary
        const result = yield cloudinary_config_1.default.uploader.upload(req.file.path, {
            folder: '../commons/uploads',
            use_filename: true,
        });
        // Remove file from local server
        yield promises_1.default.unlink(req.file.path);
        // Return the uploaded image URL
        res.status(200).json({
            url: result.secure_url,
            message: 'Image uploaded successfully',
        });
    }
    catch (err) {
        // handle unexpected error
        (0, handle_error_1.handleError)(res, { error: err });
    }
});
exports.uploadImage = uploadImage;
