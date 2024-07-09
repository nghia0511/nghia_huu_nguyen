import { Router, Request, Response } from 'express';
import { resourceRoutes } from './resourceRoutes';

const router = Router();

router.use('/resource', resourceRoutes);

export const API_V1 = router;
