import express from 'express';
const router = express.Router();
import * as TestimonialRouter from "../controllers/testimonialController.js";


router.post('/addtestimonial', TestimonialRouter.addTestimonial);
router.get('/approved', TestimonialRouter.getAllApprovedTestimonials);
router.get('/', TestimonialRouter.getAllTestimonials);
router.put('/id/approve', TestimonialRouter.approvedTestimonial);

export { router as testimonialRouter };