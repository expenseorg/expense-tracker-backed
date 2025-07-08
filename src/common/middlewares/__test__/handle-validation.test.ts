import { validationResult } from 'express-validator';
import { validate } from '../handle-validation';

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockRequest = {
  body: {},
};

const mockNext = jest.fn();

jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: () => true,
    array: () => [],
  })),
  matchedData: jest.fn(() => ({ email: 'test@example.com' })),
}));

describe('validate middleware', () => {
  it('should call next function when there is no validation error', () => {
    validate(mockRequest as any, mockResponse as any, mockNext as any);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should send error when there are errors" , () => {
    (validationResult as unknown as jest.Mock).mockReturnValueOnce({
      isEmpty: () => false,
      array: () => [{ msg: 'test error' } , { msg: 'test error 2' }],
    });
    validate(mockRequest as any, mockResponse as any, mockNext as any);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'test error | test error 2',
    })
  })
});
