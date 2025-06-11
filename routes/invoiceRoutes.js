import express from 'express';
const router = express.Router();
import * as invoicesController from "../controllers/invoiceController.js";

router.get('/invoice', invoicesController.invoicesController);

export { router as invoicesRouter };
