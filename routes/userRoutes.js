import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js';
const router = express.Router();
import * as userController from "../controllers/userController.js";

// router.get('/user', userController.userController);
router.get('/user/profile',verifyToken, userController.getUserProfile);
router.put('/user/profileupdate',verifyToken, userController.updateUserProfile);
router.put('/user/profileAcc',verifyToken, userController.updateUserAccount);

export { router as userRouter };
