<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as userController from "../controllers/userController.js";

router.get('/user', userController.userController);

export { router as userRouter };
>>>>>>> origin/main
