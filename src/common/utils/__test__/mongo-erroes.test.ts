import { isDuplicateKeyError } from '../mongo-errors';

describe('isDuplicateKeyError', () => {
  it('should return true when error code is 11000', () => {
    const error = { errorResponse: { code: 11000 } };
    expect(isDuplicateKeyError(error)).toBe(true);
  });
  it('should return false when error code is not 11000', () => {
    const error = { errorResponse: { code: 11001 } };
    expect(isDuplicateKeyError(error)).toBe(false);
  });
});
