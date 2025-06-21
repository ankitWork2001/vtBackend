import express from 'express';
const router = express.Router();
import * as cartController from "../controllers/cartController.js";
import {verifyToken} from '../middleware/verifyToken.js';


router.post('/cart', verifyToken,  cartController.addToCart);                       // Add item
router.get('/cart', verifyToken, cartController.getCart);                          // Get all cart items
router.put('/cart', verifyToken, cartController.updateCartItem);                   // Update quantity
router.delete('/cart/:productId', verifyToken, cartController.removeCartItem);     // Remove specific item
router.delete('/cart', verifyToken, cartController.clearCart);  

export { router as cartRouter };
