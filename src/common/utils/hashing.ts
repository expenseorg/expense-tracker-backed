import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants/config.constants';

/**
 * Hashes a plain text string (usually a password)
 * @param plainText The string to hash
 */
export const encrypt = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(plainText, salt);
};

/**
 * Compares a plain text string with a hashed string
 * @param plainText The original plain string
 * @param hashedText The previously hashed string
 */
export const decrypt = async (
  plainText: string,
  hashedText: string
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashedText);
};
