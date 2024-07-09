import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';

export const validateGetResources = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    page: Joi.number().min(1).optional(),
    perPage: Joi.number().min(1).optional()
  });

  try {
    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, (error as Error).message || 'Validation error'));
  }
};

export const validateCreateResource = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    description: Joi.string().optional().max(1000),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, (error as Error).message || 'Validation error'));
  }
};
