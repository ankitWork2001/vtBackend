
import express from 'express';
const router = express.Router();
import * as eventController from "../controllers/eventController.js";

router.get('/event', eventController.eventController);

export { router as eventRouter };

