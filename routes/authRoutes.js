const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers/adminController');

router.get('/Auth', AuthController);

module.exports = router;
