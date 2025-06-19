import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";

router.get('/allservices', servicesController.getAllServices);
router.get('/userservices', servicesController.getUserServices);

router.post('/services', servicesController.createService);
router.get('/services', servicesController.getAllAdminServices);
router.get('/services/:id', servicesController.getServiceById);
router.put('/services/:id', servicesController.updateServiceById);
router.delete('/services/:id', servicesController.deleteServiceById);


export { router as servicesRouter };