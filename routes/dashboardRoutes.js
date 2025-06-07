import express from 'express';
const router = express.Router();
import * as dashboardController from "../controllers/dashboardController.js";

router.get('/dashboard', dashboardController.dashboardController);

export { router as dashboardRouter };
