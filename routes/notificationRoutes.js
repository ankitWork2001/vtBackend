import express from 'express';
const router = express.Router();
import * as notificationController from "../controllers/notificationController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import { authorizeRoles } from '../middleware/roleMiddleware.js';

router.get('/notification/settings', verifyToken,authorizeRoles('admin'), notificationController.getNotificationSettings);
router.put("/notification/settings", verifyToken,authorizeRoles('admin'), notificationController.updateNotificationSettings);

export { router as notificationRouter };
