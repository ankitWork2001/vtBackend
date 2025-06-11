<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as TestimonialRouter from "../controllers/testimonialController.js";


router.post('/addtestimonial', TestimonialRouter.addTestimonial);

export { router as testimonialRouter };
>>>>>>> origin/main
