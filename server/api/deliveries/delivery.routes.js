import express from 'express';
import { getCompaniesByState } from '../companies/company.controller.js';

const router = express.Router();

router.get('/serving-state/:state', getCompaniesByState);

export default router;
