import express from 'express';
import { loginCompany } from './auth.controller.js';

const router = express.Router();

router.post('/login', loginCompany);

export default router;
