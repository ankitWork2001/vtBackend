import express from 'express';
const router = express.Router();
import * as dashboardController from "../controllers/dashboardController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';


// router.get('/dashboard',verifyToken, dashboardController.getDashboardData);

// 1. Get Dashboard Summary
router.get('/summary',verifyToken,authorizeRoles('admin'), dashboardController.getDashboardSummary);

// 2. Get Sales Details
router.get('/sales', verifyToken,authorizeRoles('admin'), dashboardController.getSalesDetails);

// 3. Get All Orders
router.get('/orders', verifyToken,authorizeRoles('admin'), dashboardController.getOrders);

// 4. Update Order Status
router.put('/orders/:id/status', verifyToken,authorizeRoles('admin'), dashboardController.updateOrderStatus);



// user wallet amount
router.get('/usersummary',verifyToken,authorizeRoles('user'),dashboardController.getUserDashboardSummary)


export { router as dashboardRouter };
