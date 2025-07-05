/**
 * this file contains all the user related routes
 */

import { Router } from 'express';
import { getUser } from '../controllers/user.controller';

// initialize router
const router = Router();

// get all users
router.get('/', getUser);

// export all the user Routes
export default router;
