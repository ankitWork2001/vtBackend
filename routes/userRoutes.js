import express from 'express';
const router = express.Router();
import * as userController from "../controllers/userController.js";

// router.get('/user', userController.userController);
router.get('/user/profile', userController.getUserProfile);
router.put('/user/profileupdate', userController.updateUserProfile);
router.put('/user/profileAcc', userController.updateUserAccount);

export { router as userRouter };
