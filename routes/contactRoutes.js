
import express from 'express';
const router = express.Router();
import * as contactController from "../controllers/contactController.js";


router.get('/contact', contactController.contactController);

export { router as contactRouter };

