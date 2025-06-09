import express from 'express';
import { login, logout, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/signup',signup);
router.post('/auth/login',login);
router.post('/auth/logout',logout); 


export { router as authRouter };
