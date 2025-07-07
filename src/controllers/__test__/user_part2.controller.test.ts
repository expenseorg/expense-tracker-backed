import User from '../../models/User.model';
import { deleteUser } from '../user.controller';

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
// mock user model
jest.mock('../../models/User.model', () => ({
  deleteOne: jest.fn(() => mockDelete),
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
