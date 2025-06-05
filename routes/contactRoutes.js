const express = require('express');
const router = express.Router();

const { ContactController } = require('../controllers/adminController');

router.get('/Contact', ContactController);

module.exports = router;
