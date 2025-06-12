import express from 'express';
const router = express.Router();
import * as pricingPlanController from "../controllers/pricingPlanController.js";

router.get('/', pricingPlanController.pricingController);
router.get('/:id', pricingPlanController.specificPlanController);
router.post('/', pricingPlanController.createPlanController);
router.put('/:id', pricingPlanController.updatePlanController);
router.delete('/:id', pricingPlanController.deletePlanController);

export { router as planpricingRouter };
