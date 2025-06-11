<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { CartController } = require('../controllers/adminController');

router.get('/Cart', CartController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as cartController from "../controllers/cartController.js";

router.get('/cart', cartController.cartController);

export { router as cartRouter };
>>>>>>> origin/main
