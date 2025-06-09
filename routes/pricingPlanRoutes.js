

import express from 'express';
const router = express.Router();
import * as pricingController from "../controllers/pricingPlanController.js";

router.get('/pricingplan', pricingController.pricingController);

export { router as planpricingRouter };

