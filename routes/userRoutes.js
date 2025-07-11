import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { upload } from '../middleware/upload.js';

// router.get('/user', userController.userController);
router.get('/user/profile',verifyToken, userController.getUserProfile);
router.put('/user/profileAcc',verifyToken, userController.updateUserAccount);
router.put('/user/profile/upload-image', verifyToken, upload.single('image'), userController.updateUserProfileImage);

export { router as userRouter };