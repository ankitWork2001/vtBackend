import express from 'express';
const router = express.Router();
import * as invoicesController from "../controllers/invoiceController.js";

router.get('/invoice', invoicesController.invoicesController);


router.get('/invoice');


export { router as invoicesRouter };
