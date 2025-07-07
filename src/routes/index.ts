/**
 * This will combine all the routes to be imported in the index
 */

import { Router } from 'express';
import userRoute from './user.route';
import expenseRoute from './expense.route';
import authRoute from './auth.route';
import uploadRoute from './upload.route';

// initialize router
const route = Router();

// user Route
route.use('/users', userRoute);

// auth Route
route.use('/auth', authRoute);

//expense Route
route.use('/expenses', expenseRoute);

// Upload routes
route.use('/uploads', uploadRoute);

// export all the routes
export default route;
