import express from 'express';
import { getCompaniesByState } from '../companies/company.controller.js';
import { createDelivery, getDeliveries } from './delivery.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/serving-state/:state', getCompaniesByState);
router.post('/create', createDelivery);
router.get('/all', requireAuth, getDeliveries);

export default router;

