<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/adminController');

router.get('/', adminController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as adminController from "../controllers/adminController.js";

router.get('/admin', adminController.adminController);

export {router as adminRouter};
>>>>>>> origin/main
