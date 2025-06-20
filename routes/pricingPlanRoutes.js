import express from 'express';
const router = express.Router();
import * as pricingPlanController from "../controllers/pricingPlanController.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'
router.get('/allpricingplan', verifyToken, authorizeRoles, pricingPlanController.pricingController);
router.get('/perplan/:id', verifyToken, authorizeRoles, pricingPlanController.specificPlanController);
router.post('/createplan', verifyToken, authorizeRoles, pricingPlanController.createPlanController);
router.put('/updateplan/:id', verifyToken, authorizeRoles, pricingPlanController.updatePlanController);
router.delete('/deleteplan/:id', verifyToken, authorizeRoles, pricingPlanController.deletePlanController);

export { router as planpricingRouter };
