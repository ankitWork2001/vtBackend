<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { DashboardController } = require('../controllers/adminController');

router.get('/Dashboard', DashboardController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();

router.get('/dashboard');

export { router as dashboardRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
