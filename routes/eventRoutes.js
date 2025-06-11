<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { EventController } = require('../controllers/adminController');

router.get('/Event', EventController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/eventController.js";

router.get('/event', eventController.eventController);

export { router as eventRouter };
>>>>>>> origin/main
