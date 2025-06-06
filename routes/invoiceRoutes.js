<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { InvoicesController } = require('../controllers/adminController');

router.get('/invoice', InvoicesController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();


router.get('/invoice');

export { router as invoiceRouter };
>>>>>>> 5d9bd2e4de015944f0d6aec92f6a77cd1c378a59
