import express from 'express';
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from '../../controllers/resourceController';
import { validateGetResources,validateCreateResource } from '../../validation/resourceValidation';

const router = express.Router();

router.get('/', validateGetResources, getResources);
router.get('/:id', getResourceById);
router.post('/', validateCreateResource, createResource);
router.put('/:id',validateCreateResource, updateResource);
router.delete('/:id', deleteResource);

export const resourceRoutes = router;
