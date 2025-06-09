import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
const router = express.Router();


router.post("/pickup-information",verifyToken, createPickupInfo);

export { router as pickupRouter };

