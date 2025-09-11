import express from 'express';
const router = express.Router();
import * as todoController from "../controllers/todoController.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'

router.get('/tasks',verifyToken,authorizeRoles('admin'),todoController.getAllTodoController);
router.post('/tasks',verifyToken,authorizeRoles('admin'),todoController.createTodoController);
router.put('/tasks/:id',verifyToken,authorizeRoles('admin'),todoController.updateTodoController);
router.delete('/tasks/:id',verifyToken,authorizeRoles('admin'),todoController.deleteSpecificTodoController);

export { router as todoRouter };
