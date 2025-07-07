"use strict";
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
const cloudinary_config_1 = __importDefault(require("../../common/config/cloudinary.config"));
const upload_controller_1 = require("../upload.controller");
// mock response
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
// mock request
let mockRequest = {
    file: null,
};
const mockUpload = {
    secure_url: 'mock-url',
};
// mock cloudinary
jest.mock('../../common/config/cloudinary.config', () => ({
    uploader: {
        upload: jest.fn(() => mockUpload),
    },
}));
// mock fs
jest.mock('fs/promises', () => ({
    unlink: jest.fn(),
}));
describe('POST /uploads/image', () => {
    it('should respond with 400', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, upload_controller_1.uploadImage)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: 'No file uploaded',
        });
    }));
    it('should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest = {
            file: {
                path: 'mock-path',
            },
        };
        yield (0, upload_controller_1.uploadImage)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            url: 'mock-url',
            message: 'Image uploaded successfully',
        });
    }));
    it('should respond with 500', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRequest = {
            file: {
                path: 'mock-path',
            },
        };
        jest.spyOn(cloudinary_config_1.default.uploader, 'upload').mockRejectedValue(new Error());
        yield (0, upload_controller_1.uploadImage)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
    }));
});
