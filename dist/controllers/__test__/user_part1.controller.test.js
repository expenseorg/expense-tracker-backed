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
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../user.controller");
// mock response
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};
// mock request
let mockRequest = {
    userData: {
        _id: 'mock-id',
        name: 'mock-name',
        email: 'mock-email',
        walletBalance: 100,
        profileImg: 'mock-profileImg',
    },
};
let mockSave = jest.fn().mockResolvedValue({
    _id: 'mock-id',
    name: 'mock-name',
    email: 'mock-email',
    walletBalance: 100,
    profileImg: 'mock-profileImg',
});
// mock user model
jest.mock('../../models/User.model', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            save: mockSave,
        })),
    };
});
describe('GET /user', () => {
    it('should return a message', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, user_controller_1.getUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: {
                _id: 'mock-id',
                name: 'mock-name',
                email: 'mock-email',
                walletBalance: 100,
                profileImg: 'mock-profileImg',
            },
        });
    }));
});
describe('POST /user', () => {
    beforeAll(() => {
        mockRequest = {
            validatedData: {
                name: 'mock-name',
                email: 'mock-email',
                password: 'mock-password',
            },
        };
    });
    it('should return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, user_controller_1.addUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: {
                _id: 'mock-id',
                name: 'mock-name',
                email: 'mock-email',
                walletBalance: 100,
                profileImg: 'mock-profileImg',
            },
            message: 'User created successfully',
        });
    }));
    it('should return creation failed when no save fails ', () => __awaiter(void 0, void 0, void 0, function* () {
        mockSave.mockRejectedValue(new Error());
        yield (0, user_controller_1.addUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User creation failed',
            success: false,
        });
    }));
    it('should return creation failed when no save fails with empty object', () => __awaiter(void 0, void 0, void 0, function* () {
        mockSave.mockRejectedValue({});
        yield (0, user_controller_1.addUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User creation failed',
            success: false,
        });
    }));
    it('should return delicate key error', () => __awaiter(void 0, void 0, void 0, function* () {
        const duplicateKeyError = Object.assign(new Error('Duplicate key'), {
            errorResponse: {
                code: 11000,
            },
        });
        mockSave.mockRejectedValue(duplicateKeyError);
        yield (0, user_controller_1.addUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User already exists',
            success: false,
        });
    }));
});
