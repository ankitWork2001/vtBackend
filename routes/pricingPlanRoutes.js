<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/pricingplan');

export { router as planpricingRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
