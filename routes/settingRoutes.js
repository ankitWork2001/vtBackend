import express from 'express';
const router = express.Router();
import * as settingController from "../controllers/settingController.js";

router.get('/setting', settingController.settingController);

export { router as settingRouter };
