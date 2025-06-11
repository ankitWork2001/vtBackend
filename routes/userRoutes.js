import express from 'express';
const router = express.Router();
import * as userController from "../controllers/userController.js";

router.get('/user', userController.userController);

export { router as userRouter };
