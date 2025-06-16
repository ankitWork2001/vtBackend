import express from 'express';
const router = express.Router();
import * as orderController from "../controllers/orderController.js";

// router.post('/createorder/:id', orderController.createOrder);
router.get('/allorder', orderController.getAllOrders);
router.get('/specificorder/:id', orderController.getSpecificOrder);
router.put('/getspecific/:id/status', orderController.updateOrderStatus);
router.put('/getspecific/:id', orderController.updateOrder);
router.delete('/getspecific/:id', orderController.deleteOrder);
router.put('/getspecific/:id/payment', orderController.updatePaymentStatus);

export { router as orderRouter };
