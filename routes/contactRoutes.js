<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { ContactController } = require('../controllers/adminController');

router.get('/Contact', ContactController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/contact');

export { router as contactRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
