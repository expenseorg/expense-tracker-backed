/**
 * this file contains all the user related routes
 */

import { Router } from 'express';
import { getUser, addUser, deleteUser } from '../controllers/user.controller';
import { checkSchema } from 'express-validator';
import { AddUserSchema } from '../common/validation-schemas/users/add-user';
import { validate } from '../common/middlewares/handle-validation';
import { requireAuth } from '../common/middlewares/require-auth';

// initialize router
const router = Router();

// get a single  user detail
router.get('/', requireAuth, getUser);

// add a single user
router.post('/', checkSchema(AddUserSchema), validate, addUser);

// delete a user
router.delete('/', requireAuth, deleteUser);

// export all the user Routes
export default router;
