<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { EventController } = require('../controllers/adminController');

router.get('/Event', EventController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();

router.get('/event');

export { router as eventRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
