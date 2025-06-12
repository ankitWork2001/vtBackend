import express from 'express';
const router = express.Router();

import * as contactController from "../controllers/contactController.js";


router.post('/submit', contactController.submitContactForm);

export { router as contactRouter };
