// main starting point
import express, { Response } from 'express';
import dotenv from 'dotenv';

// configure .env
dotenv.config();
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// base Route
app.get('/', (_, res: Response) => {
  res.send('Hello TypeScript with Express! Enjoy');
});

// Start the server
export default app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
