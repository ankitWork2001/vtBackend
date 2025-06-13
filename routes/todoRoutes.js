import express from 'express';
const router = express.Router();
import * as todoController from "../controllers/todoController.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'
router.get('/tasks',todoController.getAllTodoController);
router.post('/tasks',todoController.createTodoController);
router.put('/tasks/:id',todoController.updateTodoController);
router.delete('/tasks/:id',todoController.deleteSpecificTodoController);

export { router as todoRouter };
