<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as pricingController from "../controllers/pricingPlanController.js";

router.get('/pricingplan', pricingController.pricingController);

export { router as planpricingRouter };
>>>>>>> origin/main
