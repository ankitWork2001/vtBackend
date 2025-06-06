<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { NotificationController } = require('../controllers/adminController');

router.get('/notification', NotificationController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/notification');

export { router as notificationRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
