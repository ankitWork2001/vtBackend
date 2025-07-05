import express from 'express';
const router = express.Router();
import * as dashboardController from "../controllers/dashboardController.js";
import { verifyToken } from '../middleware/authMiddleware.js';


// router.get('/dashboard',verifyToken, dashboardController.getDashboardData);

// 1. Get Dashboard Summary
router.get('/summary',verifyToken, dashboardController.getDashboardSummary);

// 2. Get Sales Details
router.get('/sales', verifyToken, dashboardController.getSalesDetails);

// 3. Get All Orders
router.get('/orders', verifyToken, dashboardController.getOrders);

// 4. Update Order Status
router.put('/orders/:id/status', verifyToken, dashboardController.updateOrderStatus);

// 5. Logout User
router.post('/auth/logout', verifyToken, dashboardController.logoutUser);

// user wallet amount
router.get('/usersummary',verifyToken,dashboardController.getUserDashboardSummary)


export { router as dashboardRouter };
