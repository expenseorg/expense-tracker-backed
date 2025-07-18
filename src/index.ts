// main starting point
import express, { Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import allRoutes from './routes/index';
import { requestLogger } from './common/middlewares/request-logger';
import { devLogger, logger } from './common/utils/logger';
import passport from './common/passport/index';

// configure .env
dotenv.config();
const app = express();

//connect to mongo db
mongoose
  .connect(process.env.MONGO_URI ?? '')
  .then(() => {
    console.log('Connected to DB ');
  })
  .catch((err) => {
    logger.info('DB connection failed');
    devLogger(JSON.stringify(err, null, 2));
  });

// Middleware for parsing JSON request bodies
app.use(express.json());

// in initialize passport
app.use(passport.initialize());

/**
 * Middleware to log all request
 * using winston
 */
app.use(requestLogger);

// base Route
app.get('/', (_, res: Response) => {
  res.send('Hello TypeScript with Express! for Expense Tracker App');
});

// all routes
app.use('/api', allRoutes);

// Start the server
export default app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT:${process.env.PORT}`);
});
