import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';

export const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
  };

  if (config.BUILD_MODE !== 'dev') delete responseError.stack;

  res.status(responseError.statusCode).json(responseError);
};

