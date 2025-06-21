import express from 'express';
const router = express.Router();
import * as todoController from "../controllers/todoController.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'
router.get('/tasks',verifyToken,authorizeRoles,todoController.getAllTodoController);
router.post('/tasks',verifyToken,authorizeRoles,todoController.createTodoController);
router.put('/tasks/:id',verifyToken,authorizeRoles,todoController.updateTodoController);
router.delete('/tasks/:id',verifyToken,authorizeRoles,todoController.deleteSpecificTodoController);

export { router as todoRouter };
