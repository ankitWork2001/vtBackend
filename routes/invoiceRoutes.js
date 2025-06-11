<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { InvoicesController } = require('../controllers/adminController');

router.get('/invoice', InvoicesController);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as invoicesController from "../controllers/invoiceController.js";

router.get('/invoice', invoicesController.invoicesController);

export { router as invoicesRouter };
>>>>>>> origin/main
