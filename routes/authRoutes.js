<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { AuthController } = require('../controllers/adminController');

router.get('/Auth', AuthController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/auth');

export { router as authRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
