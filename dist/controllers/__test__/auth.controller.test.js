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
const auth_controller_1 = require("../auth.controller");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// cont mock req
const mockRequest = {
    validatedData: {
        email: 'mock-email',
        password: 'mock-password',
    },
};
// mock response
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
let mockUser = {
    name: 'mock-name',
    password: 'hashed-password',
    email: 'mock-email',
    profileImg: 'mock-profileImg',
    walletBalance: 100,
    _id: 'mock-id',
};
// mock user model
jest.mock('../../models/User.model', () => {
    return {
        findOne: jest.fn(() => mockUser),
    };
});
// Mock JWT
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mocked-jwt-token'),
}));
let mockCompare = true;
// mock bcrypt
jest.mock('bcrypt', () => ({
    compare: jest.fn(() => mockCompare),
}));
describe('POST /auth/login', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'mock-secret';
        process.env.JWT_EXPIRATION_TIME = '1d';
    });
    it('should return success when both user name and pass is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_controller_1.login)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(bcrypt_1.default.compare).toHaveBeenCalledWith('mock-password', 'hashed-password');
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id: 'mock-id' }, 'mock-secret', {
            expiresIn: expect.any(String),
        });
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: {
                token: 'mocked-jwt-token',
                user: {
                    id: 'mock-id',
                    name: 'mock-name',
                    email: 'mock-email',
                },
            },
            message: 'Login successful',
        });
    }));
    it('should return error when the password dose not match ', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCompare = false;
        yield (0, auth_controller_1.login)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid password',
        });
        mockCompare = false;
    }));
    it('should return error invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUser = undefined;
        yield (0, auth_controller_1.login)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid email',
        });
    }));
});
