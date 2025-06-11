<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { OrderController } = require('../controllers/adminController');

router.get('/order', OrderController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as orderController from "../controllers/orderController.js";

router.get('/order', orderController.orderController);

export { router as orderRouter };
>>>>>>> origin/main
