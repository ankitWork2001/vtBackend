<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { NotificationController } = require('../controllers/adminController');

router.get('/notification', NotificationController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as notificationController from "../controllers/notificationController.js";

router.get('/notification', notificationController.notificationController);

export { router as notificationRouter };
>>>>>>> origin/main
