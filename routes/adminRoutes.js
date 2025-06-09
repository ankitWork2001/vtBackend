
import express from 'express';
const router = express.Router();
import * as adminController from "../controllers/adminController.js";

router.get('/admin', adminController.adminController);

export {router as adminRouter};

