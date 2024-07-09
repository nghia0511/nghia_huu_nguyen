import { getDB } from '../config/mongodb';
import { ObjectId, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';
import Joi from 'joi';
import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';

interface Resource {
  _id?: ObjectId;
  title: string;
  description?: string;
}

const RESOURCE_COLLECTION_NAME = 'resources';

const RESOURCE_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().max(255),
  description: Joi.string().optional().max(1000),
});

const paginate = async (page: number = 1, perPage: number = 10): Promise<{ data: Resource[], total: number, page: number, perPage: number, totalPages: number }> => {
  const db = getDB();
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const resources = await db.collection<Resource>(RESOURCE_COLLECTION_NAME)
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalResources = await db.collection<Resource>(RESOURCE_COLLECTION_NAME).countDocuments();

  return {
    data: resources,
    total: totalResources,
    page,
    perPage,
    totalPages: Math.ceil(totalResources / perPage)
  };
};

const findById = async (id: ObjectId): Promise<Resource | null> => {
  const db = getDB();
  return await db.collection<Resource>(RESOURCE_COLLECTION_NAME).findOne({ _id: id });
};

const create = async (resourceData: Resource): Promise<Resource> => {
  const db = getDB();
  const { error } = RESOURCE_COLLECTION_SCHEMA.validate(resourceData);
  if (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.details[0].message);
  }
  const result: InsertOneResult<Resource> = await db.collection<Resource>(RESOURCE_COLLECTION_NAME).insertOne(resourceData);
  const createdResource: Resource | null = await db.collection<Resource>(RESOURCE_COLLECTION_NAME).findOne({ _id: result.insertedId });

  if (!createdResource) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve created resource');
  }
  return createdResource;
};

const update = async (id: ObjectId, resourceData: Resource): Promise<Resource> => {
  const db = getDB();
  const { error } = RESOURCE_COLLECTION_SCHEMA.validate(resourceData);
  if (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.details[0].message);
  }

  const filter = { _id: id };
  const updateDoc = {
    $set: {
      title: resourceData.title,
      description: resourceData.description,
    },
  };

  await db.collection<Resource>(RESOURCE_COLLECTION_NAME).updateOne(filter, updateDoc);

  const updatedResource: Resource | null = await db.collection<Resource>(RESOURCE_COLLECTION_NAME).findOne(filter);

  if (!updatedResource) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to retrieve updated resource');
  }
  return updatedResource;
};

const deleteResource = async (id: ObjectId): Promise<boolean> => {
  const db = getDB();
  const filter = { _id: id };
  const result: DeleteResult = await db.collection<Resource>(RESOURCE_COLLECTION_NAME).deleteOne(filter);

  if (result.deletedCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
  }

  return true;
};

export const resourceModel = {
  paginate,
  findById,
  create,
  update,
  deleteResource,
};
