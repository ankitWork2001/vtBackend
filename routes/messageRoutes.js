const express = require('express');
const router = express.Router();

const { MessageController } = require('../controllers/adminController');

router.get('/message', MessageController);

module.exports = router;
