// import express from 'express';
// const router = express.Router();
// import * as invoicesController from "../controllers/invoiceController.js";

// router.get('/invoice', invoicesController.invoicesController);

// export { router as invoicesRouter };

import express from 'express';
const router = express.Router();
import {
  getInvoiceById,
  createInvoice,
  updateInvoice,
  sendInvoice,
  downloadInvoice
} from '../controllers/invoiceController.js';

// GET /api/invoices/:invoiceId
router.get('/invoices/:invoiceId', getInvoiceById);

// POST /api/invoices
router.post('/invoices', createInvoice);

// PUT /api/invoices/:invoiceId
router.put('/invoices/:invoiceId', updateInvoice);

// POST /api/invoices/:invoiceId/send
router.post('/invoices/:invoiceId/send', sendInvoice);

// GET /api/invoices/:invoiceId/download
router.get('/invoices/:invoiceId/download', downloadInvoice);

export { router as invoicesRouter };
