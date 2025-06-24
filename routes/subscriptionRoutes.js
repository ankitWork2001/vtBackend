import express from 'express';
const router = express.Router();
import * as subscriptionController from "../controllers/subscriptionController.js";

router.post('/create', subscriptionController.createSubscription);
router.get('/get', subscriptionController.getSubscription);
router.put('/update/:id/cancel', subscriptionController.cancelSubscription);
router.put('/update/:id', subscriptionController.updateSubscription);

export { router as subscriptionRouter };
