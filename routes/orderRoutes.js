<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { OrderController } = require('../controllers/adminController');

router.get('/order', OrderController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();

router.get('/order');

export { router as orderRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
