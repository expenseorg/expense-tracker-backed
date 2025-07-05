/**
 * This file contains all the expense related routes
 */

import { Router } from 'express';

// initialize router
const router = Router();

// get all expenses
router.get('/', (_, res) => {
  res.send('get all expenses');
});

// export all the expense Routes
export default router;
