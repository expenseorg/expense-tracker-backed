import { handleError } from '../handle-error';

const mockResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

const mockLogger = jest.fn();
jest.mock('../logger', () => ({
  logger: {
    error: jest.fn((props) => mockLogger(props)),
  },
}));

describe('handleError', () => {
  it('should return 500 on no error code passed ', () => {
    handleError(mockResponse as any, {} as any);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Server down please try after some time',
    });
  });

  it('should return custom message and status code', () => {
    handleError(
      mockResponse as any,
      {
        message: 'Custom error message',
        statusCode: 400,
      } as any
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Custom error message',
    });
  });

  it('return not error object when in dev mode', () => {
    handleError(
      mockResponse as any,
      {
        error: {
          error: 'Duplicate key',
        },
      } as any
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockLogger).not.toHaveBeenCalledWith(
      JSON.stringify(
        {
          error: 'Duplicate key',
        },
        null,
        2
      )
    );
  });

  it('return error object when in dev mode', () => {
    process.env.NODE_ENV = 'development';
    handleError(
      mockResponse as any,
      {
        error: {
          error: 'Duplicate key',
        },
      } as any
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockLogger).toHaveBeenCalledWith(
      JSON.stringify(
        {
          error: 'Duplicate key',
        },
        null,
        2
      )
    );
  });
});
