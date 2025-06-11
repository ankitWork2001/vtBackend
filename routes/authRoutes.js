import express from 'express';
const router = express.Router();
import * as authRouter from "../controllers/authController.js";

router.get('/auth', authRouter.authnication);

export { router as authRouter };
