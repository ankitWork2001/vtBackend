<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/adminController');

router.get('/getUsersDetails',getAllUsers);

module.exports = router;
=======
import express from 'express';
const router = express.Router();
import * as todoController from "../controllers/todoController.js";

router.get('/todo', todoController.todoController);

export { router as todoRouter };
>>>>>>> origin/main
