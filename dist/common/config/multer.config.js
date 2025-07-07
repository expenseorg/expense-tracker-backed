"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_constants_1 = require("../constants/config.constants");
// Multer configuration
exports.uploadImageMulter = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, '../uploads/'),
    limits: { fileSize: config_constants_1.IMAGE_MAX_SIZE },
    fileFilter(_, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});
