import { MongoServerError } from 'mongodb';

/**
 * Checks if a given error is a duplicate key error in MongoDB.
 *
 * @param error - The error to check.
 *
 * @returns {boolean} True if the error is a duplicate key error.
 */

export function isDuplicateKeyError(error: unknown): boolean {
  return (error as MongoServerError)?.errorResponse?.code === 11000;
}