import express from 'express';
const router = express.Router();
import * as notificationController from "../controllers/notificationController.js";
import {verifyToken} from "../middleware/authMiddleware.js";


router.get('/notification/settings', verifyToken, notificationController.getNotificationSettings);
router.put("/notification/settings", verifyToken, notificationController.updateNotificationSettings);

export { router as notificationRouter };
