import cloudinary from '../../common/config/cloudinary.config';
import { uploadImage } from '../upload.controller';

// mock response
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// mock request
let mockRequest: any = {
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
  it('should respond with 400', async () => {
    await uploadImage(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'No file uploaded',
    });
  });

  it('should respond with 200', async () => {
    mockRequest = {
      file: {
        path: 'mock-path',
      },
    };
    await uploadImage(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      url: 'mock-url',
      message: 'Image uploaded successfully',
    });
  });

  it('should respond with 500', async () => {
    mockRequest = {
      file: {
        path: 'mock-path',
      },
    };
    jest.spyOn(cloudinary.uploader, 'upload').mockRejectedValue(new Error());
    await uploadImage(mockRequest as any, mockResponse as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
