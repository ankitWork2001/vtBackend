const express = require('express');
const router = express.Router();

const { EventController } = require('../controllers/adminController');

router.get('/Event', EventController);

module.exports = router;
