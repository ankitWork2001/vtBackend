import express from 'express';
const router = express.Router();
import * as notificationController from "../controllers/notificationController.js";

router.get('/notification', notificationController.notificationController);

export { router as notificationRouter };
