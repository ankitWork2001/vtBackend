import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { createPickupInfo } from '../controllers/pickupController.js';
const router = express.Router();

router.post("/pickup-information",verifyToken, createPickupInfo);

export { router as pickupRouter };

