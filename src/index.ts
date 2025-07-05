// main starting point
import express, { Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import allRoutes from './routes/index';

// configure .env
dotenv.config();
const app = express();

//connect to mongo db
mongoose
  .connect(process.env.MONGO_URI ?? '')
  .then(() => {
    console.log('Connected to DB ');
  })
  .catch(() => {
    console.log('DB connection failed ');
  });

// Middleware for parsing JSON request bodies
app.use(express.json());

// base Route
app.get('/', (_, res: Response) => {
  res.send('Hello TypeScript with Express! Enjoy');
});

// all routes
app.use('/api', allRoutes);

// Start the server
export default app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
