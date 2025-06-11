<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";

router.get('/services', servicesController.servicesController);

export { router as servicesRouter };
>>>>>>> origin/main
