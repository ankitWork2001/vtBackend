const express = require('express');
const router = express.Router();

const { OrderController } = require('../controllers/adminController');

router.get('/order', OrderController);

module.exports = router;
