import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/eventController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
router.get('/events',verifyToken,authorizeRoles('admin'), eventController.getAllEvents);
router.get('/events/:id',verifyToken,authorizeRoles('admin'), eventController.getEventById);
router.post('/events',verifyToken,authorizeRoles('admin'), eventController.createEvent);
router.put('/events/:id',verifyToken,authorizeRoles('admin'), eventController.updateEvent);
router.delete('/events/:id',verifyToken,authorizeRoles('admin'), eventController.deleteEvent);

export { router as eventRouter };
