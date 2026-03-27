import express from 'express';
import { registerCompany, getCompaniesByState } from './company.controller.js';
import { uploadLogo } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.post('/register', uploadLogo.single('logo'), registerCompany);
router.get('/state/:state', getCompaniesByState);

export default router;
