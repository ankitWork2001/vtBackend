import express from 'express';
const router = express.Router();
import * as todoController from "../controllers/todoController.js";

router.get('/todo', todoController.todoController);

export { router as todoRouter };
