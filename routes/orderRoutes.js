import express from 'express';
const router = express.Router();
import * as orderController from "../controllers/orderController.js";

router.get('/order', orderController.orderController);

export { router as orderRouter };
