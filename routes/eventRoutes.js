import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/eventController.js";

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

export { router as eventRouter };
