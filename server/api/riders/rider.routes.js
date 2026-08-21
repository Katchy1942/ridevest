import express from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { uploadProfilePhoto } from '../../middleware/upload.middleware.js';
import { 
   registerRider,
   getRiders, 
   updateRiderStatus, 
   deleteRider 
} from './rider.controller.js';

import { loginRider } from '../auth/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/register', uploadProfilePhoto.single('profilePhoto'), registerRider);
router.post('/login', loginRider);

// Authenticated routes
router.use(requireAuth);

router.get('/all', getRiders);
router.patch('/:id/status', updateRiderStatus);
router.delete('/:id', deleteRider);

export default router;
