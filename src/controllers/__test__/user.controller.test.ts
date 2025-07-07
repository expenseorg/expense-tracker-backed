import { getUser, addUser } from '../user.controller';

// mock response
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// mock request
let mockRequest: any = {
  userData: {
    _id: 'mock-id',
    name: 'mock-name',
    email: 'mock-email',
    walletBalance: 100,
    profileImg: 'mock-profileImg',
  },
};

describe('GET /user', () => {
  it('should return a message', async () => {
    await getUser(mockRequest as any, mockResponse as any);
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
  });
});

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
  it('should return 201', async () => {
    await addUser(mockRequest as any, mockResponse as any);
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
  });
  it('should return creation failed when no save fails ', async () => {
    mockSave.mockRejectedValue(new Error());
    await addUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User creation failed',
      success: false,
    });
  });

  it('should return creation failed when no save fails with empty object', async () => {
    mockSave.mockRejectedValue({});
    await addUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User creation failed',
      success: false,
    });
  });

  it('should return delicate key error', async () => {
    const duplicateKeyError = Object.assign(new Error('Duplicate key'), {
      errorResponse: {
        code: 11000,
      },
    });
    mockSave.mockRejectedValue(duplicateKeyError);
    await addUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User already exists',
      success: false,
    });
  });
});
