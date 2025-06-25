import express from 'express';
const router = express.Router();
import * as TestimonialRouter from "../controllers/testimonialController.js";
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/addtestimonial',verifyToken, TestimonialRouter.addTestimonial);
router.get('/approved',verifyToken, TestimonialRouter.getAllApprovedTestimonials);
router.get('/',verifyToken, TestimonialRouter.getAllTestimonials);
router.put('/:id/approve',verifyToken, TestimonialRouter.approvedTestimonial);

export { router as testimonialRouter };