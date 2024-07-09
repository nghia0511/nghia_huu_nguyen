// src/server.ts
import express, { Request, Response } from 'express';
import config from './config/config';
import exitHook from 'async-exit-hook';
import { StatusCodes } from 'http-status-codes';
import { connectDB, closeDB } from './config/mongodb';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';
import { API_V1 } from './routes/v1';

const START_SERVER = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1', API_V1)

  // Error handling middleware for 404 - Not Found
  app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
  });

  app.use(errorHandlingMiddleware)

  // Start the server
  app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  });

  exitHook(() => {
    closeDB();
  });
};

(async () => {
  try {
    await connectDB();
    await START_SERVER();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
