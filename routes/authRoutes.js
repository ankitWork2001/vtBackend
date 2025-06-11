<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers/adminController');

router.get('/Auth', AuthController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as authRouter from "../controllers/authController.js";

router.get('/auth', authRouter.authnication);

export { router as authRouter };
>>>>>>> origin/main
