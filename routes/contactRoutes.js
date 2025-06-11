<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { ContactController } = require('../controllers/adminController');

router.get('/Contact', ContactController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as contactController from "../controllers/contactController.js";


router.get('/contact', contactController.contactController);

export { router as contactRouter };
>>>>>>> origin/main
