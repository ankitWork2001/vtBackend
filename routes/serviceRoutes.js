import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";


router.post('/services', servicesController.createService);
router.get('/services', servicesController.getAllServices);
router.get('/services/:id', servicesController.getServiceById);
router.put('/services/:id', servicesController.updateServiceById);
router.delete('/services/:id', servicesController.deleteServiceById);


export { router as servicesRouter };
