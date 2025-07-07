import User from '../../models/User.model';
import { deleteUser, updateUser } from '../user.controller';

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

let mockDelete: any = {
  deletedCount: 1,
};
let mockUpdate: any = {
  _id: 'mock-id',
  name: 'mock-name',
  email: 'mock-email',
  walletBalance: 100,
  profileImg: 'mock-profileImg',
}
// mock user model
jest.mock('../../models/User.model', () => ({
  deleteOne: jest.fn(() => mockDelete),
  findOneAndUpdate : jest.fn(() => mockUpdate),
}));

jest.mock('../../common/utils/hashing', () => ({
  encrypt: jest.fn().mockImplementation((str: string) => `hashed-${str}`),
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
  it('should return 200', async () => {
    await deleteUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'User deleted successfully',
    });
  });
  it('should return 500 when deletedUser is empty', async () => {
    mockDelete = null;
    await deleteUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'User deletion failed',
    });
  });

  it('should return 500 when delete one fails', async () => {
    (User.deleteOne as jest.Mock).mockRejectedValue(new Error());
    await deleteUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Server down please try after some time',
    });
  });
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

  it('should update user and return 200', async () => {
    await updateUser(mockRequest as any, mockResponse as any);
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'mock-id' },
      mockRequest.validatedData,
      { new: true }
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockUpdate,
      message: 'User updated successfully',
    });
  });

  it('should return 500 when updatedUser is empty', async () => {
    mockUpdate = null;
    await updateUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'User update failed',
    });
  });

  it('should return 500 when update one fails', async () => {
    (User.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error());
    await updateUser(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Server down please try after some time',
    });
  });
});
