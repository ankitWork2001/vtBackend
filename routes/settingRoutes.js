import express from 'express';
const router = express.Router();
import * as settingController from "../controllers/settingController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
// admin routes  
router.get('/general',verifyToken,authorizeRoles('admin'), settingController.getGeneralSettings);
router.put('/general',verifyToken,authorizeRoles('admin'), settingController.updateGeneralSettings);
router.post('/general/logo',verifyToken,authorizeRoles('admin'), settingController.createGeneralSettings);

export { router as settingRouter };
 