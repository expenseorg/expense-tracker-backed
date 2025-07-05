/**
 * This will combine all the routes to be imported in the index
 */

import { Router } from 'express';
import userRoute from './user.route';
import expenseRoute from './expense.route';

// initialize router
const route = Router();

// user Route
route.use('/user', userRoute);

//expense Route
route.use('/expense', expenseRoute);

// export all the routes
export default route;
