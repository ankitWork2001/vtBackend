import express from 'express';
const router = express.Router();
import * as dashboardController from "../controllers/dashboardController.js";
import { verifyToken } from '../middleware/authMiddleware.js';


router.get('/dashboard',verifyToken, dashboardController.getDashboardData);

export { router as dashboardRouter };
