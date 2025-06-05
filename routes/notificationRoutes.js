const express = require('express');
const router = express.Router();

const { NotificationController } = require('../controllers/adminController');

router.get('/notification', NotificationController);

module.exports = router;
