<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as pickupController from "../controllers/pickupController.js";

router.get('/pickup', pickupController.pickupController);

export { router as pickupRouter };
>>>>>>> origin/main
