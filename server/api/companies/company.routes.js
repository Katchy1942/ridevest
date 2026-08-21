import express from 'express';
import { registerCompany, getCompaniesByState, getAllCompanies } from './company.controller.js';
import { uploadLogo } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.post('/register', uploadLogo.single('logo'), registerCompany);
router.get('/all', getAllCompanies);
router.get('/state/:state', getCompaniesByState);

export default router;
