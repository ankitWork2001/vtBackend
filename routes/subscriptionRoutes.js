import express from 'express';
const router = express.Router();
import * as subscriptionController from "../controllers/subscriptionController.js";
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/create',verifyToken, subscriptionController.createSubscription);
router.get('/get',verifyToken, subscriptionController.getSubscription);
router.put('/update/:id/cancel',verifyToken, subscriptionController.cancelSubscription);
router.put('/update/:id',verifyToken, subscriptionController.updateSubscription);

export { router as subscriptionRouter };
