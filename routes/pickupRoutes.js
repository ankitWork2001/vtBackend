import express from 'express';
const router = express.Router();
import * as pickupController from "../controllers/pickupController.js";

router.get('/pickup', pickupController.pickupController);

export { router as pickupRouter };
