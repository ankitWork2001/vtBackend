const express = require('express');
const router = express.Router();

const { DashboardController } = require('../controllers/adminController');

router.get('/Dashboard', DashboardController);

module.exports = router;
