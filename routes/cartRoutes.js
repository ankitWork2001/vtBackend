
import express from 'express';
const router = express.Router();
import * as cartController from "../controllers/cartController.js";

router.get('/cart', cartController.cartController);

export { router as cartRouter };

