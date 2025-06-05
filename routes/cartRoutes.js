const express = require('express');
const router = express.Router();

const { CartController } = require('../controllers/adminController');

router.get('/Cart', CartController);

module.exports = router;
