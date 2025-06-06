<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers/adminController');

router.get('/', adminController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();

router.get('/admin');

export {router as adminRouter};
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
