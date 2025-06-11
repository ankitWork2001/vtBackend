import express from 'express';
const router = express.Router();

import {verifyToken} from '../middleware/authMiddleware.js'; 

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
