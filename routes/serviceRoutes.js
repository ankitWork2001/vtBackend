import express from 'express';
const router = express.Router();
import * as servicesController from "../controllers/serviceController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

router.get('/allservices',verifyToken, servicesController.getAllServices);
router.get('/userservices',verifyToken, servicesController.getUserServices);

router.post('/services',verifyToken,authorizeRoles('admin'), servicesController.createService);
router.get('/services',verifyToken,authorizeRoles('admin'), servicesController.getAllAdminServices);
router.get('/services/:id',verifyToken,authorizeRoles('admin'), servicesController.getServiceById);
router.put('/services/:id',verifyToken,authorizeRoles('admin'), servicesController.updateServiceById);
router.delete('/services/:id',verifyToken,authorizeRoles('admin'), servicesController.deleteServiceById);


export { router as servicesRouter };