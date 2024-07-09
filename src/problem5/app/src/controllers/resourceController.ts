import { Request, Response, NextFunction } from 'express';
import { resourceModel } from '../models/resourceModel';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import ApiError from '../utils/ApiError';

export const getResources = async (req: Request, res: Response, next: NextFunction) => {
  const { page, perPage } = req.query;

  try {
    const result = await resourceModel.paginate(Number(page) || 1, Number(perPage) || 10);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getResourceById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const resource = await resourceModel.findById(new ObjectId(id));
    if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
    res.status(StatusCodes.OK).json(resource);
  } catch (error) {
    next(error);
  }
}

export const createResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdResource = await resourceModel.create(req.body);
    res.status(StatusCodes.CREATED).json(createdResource);
  } catch (error) {
    next(error);
  }
};

export const updateResource = async (req: Request, res: Response, next: NextFunction) => {
  const resourceId: string = req.params.id;
  const { title, description } = req.body;
  try {
    const resource = await resourceModel.findById(new ObjectId(resourceId));
    if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
    
    const updatedResource = await resourceModel.update(new ObjectId(resourceId), { title, description });
    res.status(StatusCodes.OK).json(updatedResource);
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (req: Request, res: Response, next: NextFunction) => {
  const resourceId: string = req.params.id;
  try {    
    await resourceModel.deleteResource(new ObjectId(resourceId));
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};
