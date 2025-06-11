import express from 'express';
const router = express.Router();
import * as subscriptionController from "../controllers/subscriptionController.js";

router.get('/subscription', subscriptionController.subscriptionController);

export { router as subscriptionRouter };
