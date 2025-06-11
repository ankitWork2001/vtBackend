import express from 'express';
const router = express.Router();
import * as TestimonialRouter from "../controllers/testimonialController.js";


router.post('/addtestimonial', TestimonialRouter.addTestimonial);

export { router as testimonialRouter };
