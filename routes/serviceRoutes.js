import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";

router.get('/allservices', servicesController.getAllServices);
router.get('/userservices', servicesController.getUserServices);

export { router as servicesRouter };