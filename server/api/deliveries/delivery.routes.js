import express from 'express';
import { getCompaniesByState } from '../companies/company.controller.js';
import { createDelivery, getDeliveries, assignRiderToDelivery } from './delivery.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/serving-state/:state', getCompaniesByState);
router.post('/create', createDelivery);
router.get('/all', requireAuth, getDeliveries);
router.patch('/:id/assign', requireAuth, assignRiderToDelivery);

export default router;

