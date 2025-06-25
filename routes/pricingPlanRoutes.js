import express from 'express';
const router = express.Router();
import * as pricingPlanController from "../controllers/pricingPlanController.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'
router.get('/allpricingplan', verifyToken, authorizeRoles('amdin'), pricingPlanController.pricingController);
router.get('/perplan/:id', verifyToken, authorizeRoles('amdin'), pricingPlanController.specificPlanController);
router.post('/createplan', verifyToken, authorizeRoles('amdin'), pricingPlanController.createPlanController);
router.put('/updateplan/:id', verifyToken, authorizeRoles('amdin'), pricingPlanController.updatePlanController);
router.delete('/deleteplan/:id', verifyToken, authorizeRoles('amdin'), pricingPlanController.deletePlanController);

export { router as planpricingRouter };
