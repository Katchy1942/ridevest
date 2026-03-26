import express from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { 
   createDevice, 
   getDevices, 
   deleteDevice 
} from './device.controller.js';

const router = express.Router();

router.use(requireAuth);

router.post('/register', createDevice);
router.get('/all', getDevices);
router.delete('/:id', deleteDevice);

export default router;
