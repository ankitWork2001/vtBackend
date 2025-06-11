<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as settingController from "../controllers/settingController.js";

router.get('/setting', settingController.settingController);

export { router as settingRouter };
>>>>>>> origin/main
