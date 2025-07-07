/**
 * This file contains all the expense related routes
 */

import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { AddExpenseSchema } from '../common/validation-schemas/expense.user';
import { validate } from '../common/middlewares/handle-validation';

// initialize router
const router = Router();

// get all expenses
router.get('/', (_, res) => {
  res.send('get all expenses');
});

// router.post('/',checkSchema(AddExpenseSchema),validate,)

// export all the expense Routes
export default router;
