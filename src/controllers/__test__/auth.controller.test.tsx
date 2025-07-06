import { login } from '../auth.controller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// cont mock req
const mockRequest: any = {
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

let mockUser: any = {
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
  it('should return success when both user name and pass is provided', async () => {
    await login(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'mock-password',
      'hashed-password'
    );
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'mock-id' }, 'mock-secret', {
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
  });

  it('should return error when the password dose not match ', async () => {
    mockCompare = false;
    await login(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid password',
    });
    mockCompare = false;
  });

  it('should return error invalid email', async () => {
    mockUser = undefined;
    await login(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid email',
    });
  });
});
