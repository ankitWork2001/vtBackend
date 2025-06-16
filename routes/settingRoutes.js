import express from 'express';
const router = express.Router();
import * as settingController from "../controllers/settingController.js";


// admin routes 
router.get('/general', settingController.getGeneralSettings);
router.put('/general', settingController.updateGeneralSettings);
router.post('/general/logo', settingController.createGeneralSettings);

export { router as settingRouter };
 