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
const User_model_1 = __importDefault(require("../../models/User.model"));
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
let mockDelete = {
    deletedCount: 1,
};
let mockUpdate = {
    _id: 'mock-id',
    name: 'mock-name',
    email: 'mock-email',
    walletBalance: 100,
    profileImg: 'mock-profileImg',
};
// mock user model
jest.mock('../../models/User.model', () => ({
    deleteOne: jest.fn(() => mockDelete),
    findOneAndUpdate: jest.fn(() => mockUpdate),
}));
jest.mock('../../common/utils/hashing', () => ({
    encrypt: jest.fn().mockImplementation((str) => `hashed-${str}`),
}));
describe('DELETE /user', () => {
    beforeAll(() => {
        mockRequest = {
            userData: {
                _id: 'mock-id',
                name: 'mock-name',
                email: 'mock-email',
                walletBalance: 100,
                profileImg: 'mock-profileImg',
            },
        };
    });
    it('should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, user_controller_1.deleteUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            message: 'User deleted successfully',
        });
    }));
    it('should return 500 when deletedUser is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        mockDelete = null;
        yield (0, user_controller_1.deleteUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'User deletion failed',
        });
    }));
    it('should return 500 when delete one fails', () => __awaiter(void 0, void 0, void 0, function* () {
        User_model_1.default.deleteOne.mockRejectedValue(new Error());
        yield (0, user_controller_1.deleteUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Server down please try after some time',
        });
    }));
});
describe('PATCH /user - updateUser', () => {
    beforeAll(() => {
        mockRequest = {
            userData: {
                _id: 'mock-id',
                name: 'mock-name',
                email: 'mock-email',
                walletBalance: 100,
                profileImg: 'mock-profileImg',
            },
            validatedData: {
                name: 'Updated Name',
                email: 'updated@example.com',
            },
        };
    });
    it('should update user and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, user_controller_1.updateUser)(mockRequest, mockResponse);
        expect(User_model_1.default.findOneAndUpdate).toHaveBeenCalledWith({ _id: 'mock-id' }, mockRequest.validatedData, { new: true });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockUpdate,
            message: 'User updated successfully',
        });
    }));
    it('should return 500 when updatedUser is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUpdate = null;
        yield (0, user_controller_1.updateUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'User update failed',
        });
    }));
    it('should return 500 when update one fails', () => __awaiter(void 0, void 0, void 0, function* () {
        User_model_1.default.findOneAndUpdate.mockRejectedValue(new Error());
        yield (0, user_controller_1.updateUser)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Server down please try after some time',
        });
    }));
});
