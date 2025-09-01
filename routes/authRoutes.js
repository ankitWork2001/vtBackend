import express from 'express';
import { authME, login, logout, signup } from '../controllers/authController.js';

const router = express.Router();



router.post('/auth/signup',signup);
router.post('/auth/login',login);
router.post('/auth/logout',logout); 
router.get('/auth/auth',authME); 


export { router as authRouter };
