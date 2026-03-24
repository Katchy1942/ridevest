import express from 'express';
import { registerCompany } from './company.controller.js';
import { uploadLogo } from '../../middleware/upload.middleware.js';

const router = express.Router();

router.post('/register', uploadLogo.single('logo'), registerCompany);

export default router;
