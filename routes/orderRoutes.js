import express from 'express';
const router = express.Router();
import * as orderController from '../controllers/orderController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  confirmOrder,
  toGetOrders,
  orderById,
  orderCancelled,
  orderDelivered
} from '../controllers/orderController.js';

// router.post('/createorder/:id', orderController.createOrder);
router.get('/allorder',verifyToken,authorizeRoles('admin'), orderController.getAllOrders);
router.get('/specificorder/:id',verifyToken,authorizeRoles('admin'), orderController.getSpecificOrder);
router.put('/getspecific/:id/status',verifyToken,authorizeRoles, orderController.updateOrderStatus);
router.put('/getspecific/:id',verifyToken,authorizeRoles('admin'), orderController.updateOrder);
router.delete('/getspecific/:id',verifyToken,authorizeRoles('admin'), orderController.deleteOrder);
router.put('/getspecific/:id/payment',verifyToken,authorizeRoles('admin'), orderController.updatePaymentStatus);




//need to write middlewares
router.post('/confirm',verifyToken, confirmOrder); 
router.get('/', verifyToken, toGetOrders);
router.get('/:id', verifyToken, orderById);
router.get('/:id/cancelled',verifyToken,  orderCancelled);
router.get('/:id/delivered', verifyToken, orderDelivered);


export { router as orderRouter };