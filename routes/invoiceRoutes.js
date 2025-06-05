const express = require('express');
const router = express.Router();

const { InvoicesController } = require('../controllers/adminController');

router.get('/invoice', InvoicesController);

module.exports = router;
