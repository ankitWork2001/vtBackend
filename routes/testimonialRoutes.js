import express from 'express';
const router = express.Router();
import { TestimonialRouter } from "../controllers/testimonialController";


router.post('/addtestimonial', TestimonialRouter.addTestimonial);
router.get('/getAllApprovedTestimonials', TestimonialRouter.getAllApprovedTestimonials);
router.get('/getAllTestimonials', TestimonialRouter.getAllTestimonials);
router.gst('/approvedTestimonial', TestimonialRouter.approvedTestimonial);

export { router as testimonialRouter };
