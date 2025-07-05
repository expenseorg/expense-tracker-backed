/**
 * @file contains all the controllers related to user
 */

import { Response } from "express";

export const getUser = (_, res: Response) => {
  res.send('get all users');
};
