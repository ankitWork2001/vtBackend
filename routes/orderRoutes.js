import express from 'express';
const router = express.Router();
import * as orderController from '../controllers/orderController.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';



router.get('/allorder',verifyToken,authorizeRoles('admin'), orderController.getAllOrders);
router.get('/specificorder/:id',verifyToken,authorizeRoles('admin'), orderController.getSpecificOrder);
router.put('/getspecific/:id/status',verifyToken,authorizeRoles, orderController.updateOrderStatus);
router.put('/getspecific/:id',verifyToken,authorizeRoles('admin'), orderController.updateOrder);
router.delete('/getspecific/:id',verifyToken,authorizeRoles('admin'), orderController.deleteOrder);
router.put('/getspecific/:id/payment',verifyToken,authorizeRoles('admin'), orderController.updatePaymentStatus);

//user side routes
router.post('/createorder', verifyToken, orderController.createOrder);
// router.post('/confirm',verifyToken, orderController.confirmOrder); 
router.get('/', verifyToken, orderController.toGetOrders);
router.get('/:id', verifyToken, orderController.orderById); 
router.get('/:id/cancelled',verifyToken,  orderController.orderCancelled);
router.get('/:id/delivered', verifyToken, orderController.orderDelivered);


export { router as orderRouter };