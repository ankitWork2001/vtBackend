<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { DashboardController } = require('../controllers/adminController');

router.get('/Dashboard', DashboardController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as dashboardController from "../controllers/dashboardController.js";

router.get('/dashboard', dashboardController.dashboardController);

export { router as dashboardRouter };
>>>>>>> origin/main
