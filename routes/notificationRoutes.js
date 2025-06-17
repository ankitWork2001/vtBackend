import express from 'express';
const router = express.Router();
import * as notificationController from "../controllers/notificationController.js";
import {verifyToken} from '../middleware/authMiddleware.js'
import {authorizeRoles} from '../middleware/roleMiddleware.js'
//admin notification routes
router.get('/getnotification',verifyToken,authorizeRoles, notificationController.getNotificationController);
router.put('/updatenotification',verifyToken,authorizeRoles, notificationController.updateNotificationController);

export { router as notificationRouter };
