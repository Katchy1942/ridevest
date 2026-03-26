import express from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { 
   createRider, 
   getRiders, 
   updateRiderStatus, 
   deleteRider 
} from './rider.controller.js';

const router = express.Router();

router.use(requireAuth);

router.post('/create', createRider);
router.get('/all', getRiders);
router.patch('/:id/status', updateRiderStatus);
router.delete('/:id', deleteRider);

export default router;
