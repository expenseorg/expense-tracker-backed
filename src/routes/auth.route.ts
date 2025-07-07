/**
 * @file contains all the authentication routes
 */

import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { checkSchema } from 'express-validator';
import { validate } from '../common/middlewares/handle-validation';
import { LoginUserValidationSchema } from '../common/validation-schemas/auth/login-user';

// initialize router
const router = Router();

// login route
router.post('/login', checkSchema(LoginUserValidationSchema), validate, login);

//export all the auth routes
export default router;
