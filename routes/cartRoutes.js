import express from 'express';
const router = express.Router();
import * as cartController from "../controllers/cartController.js";
import { verifyToken } from '../middleware/authMiddleware.js';


router.post('/addtocart', verifyToken,  cartController.addToCart);                       // Add item
router.get('/getcart', verifyToken, cartController.getCart);                          // Get all cart items
router.put('/updatecart', verifyToken, cartController.updateCartItem);                   // Update quantity
router.delete('/deletecart/:productId', verifyToken, cartController.removeCartItem);     // Remove specific item
router.delete('/deleteallcart', verifyToken, cartController.clearCart);  

export { router as cartRouter };
