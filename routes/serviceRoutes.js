
import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";

router.get('/services', servicesController.servicesController);

export { router as servicesRouter };

