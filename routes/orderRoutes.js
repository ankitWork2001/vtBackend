import express from 'express';
const router = express.Router();

// router.post('/createorder/:id', orderController.createOrder);
router.get('/allorder', orderController.getAllOrders);
router.get('/specificorder/:id', orderController.getSpecificOrder);
router.put('/getspecific/:id/status', orderController.updateOrderStatus);
router.put('/getspecific/:id', orderController.updateOrder);
router.delete('/getspecific/:id', orderController.deleteOrder);
router.put('/getspecific/:id/payment', orderController.updatePaymentStatus);

import {
  confirmOrder,
  toGetOrders,
  orderById,
  orderCancelled,
  orderDelivered
} from '../controllers/orderController.js';


//need to write middlewares
router.post('/confirm',verifyToken, confirmOrder); 
router.get('/', verifyToken, toGetOrders);
router.get('/:id', verifyToken, orderById);
router.get('/:id/cancelled',verifyToken,  orderCancelled);
router.get('/:id/delivered', verifyToken, orderDelivered);


export { router as orderRouter };