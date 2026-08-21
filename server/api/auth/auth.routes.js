import express from 'express';
import { loginCompany, loginRider, logoutCompany } from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', loginCompany);
router.post('/rider-login', loginRider);
router.post('/logout', requireAuth, logoutCompany);
router.get('/verify', requireAuth, (req, res) => {
	res.status(200).json({ valid: true, company: req.company });
});

export default router;

