<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { CartController } = require('../controllers/adminController');

router.get('/Cart', CartController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/cart');

export { router as cartRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
