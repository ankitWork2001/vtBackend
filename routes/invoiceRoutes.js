// import express from 'express';
// const router = express.Router();
// import * as invoicesController from "../controllers/invoiceController.js";

// router.get('/invoice', invoicesController.invoicesController);

// export { router as invoicesRouter };

import express from 'express';
const router = express.Router();
import {
  getInvoiceById,
  updateInvoice,
  sendInvoice,
  downloadInvoice,
  createInvoiceFromOrder,
  createInvoice
} from '../controllers/invoiceController.js';

import {verifyToken} from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js';

// GET /api/invoices/:invoiceId
router.get('/invoices/:invoiceId',verifyToken,authorizeRoles('admin'), getInvoiceById);

// POST /api/invoices
router.post('/invoices',verifyToken,authorizeRoles('admin'), createInvoice);

// this is an extra route - the ivoices are created at the time of create order
// router.post('/invoicesfromorder',verifyToken,authorizeRoles('admin'), createInvoiceFromOrder);

// PUT /api/invoices/:invoiceId
router.put('/invoices/:invoiceId',verifyToken,authorizeRoles('admin'), updateInvoice);

// POST /api/invoices/:invoiceId/send
router.post('/invoices/:invoiceId/send',verifyToken,authorizeRoles('admin'), sendInvoice);

// GET /api/invoices/:invoiceId/download
router.get('/invoices/:invoiceId/download',verifyToken,authorizeRoles('admin'), downloadInvoice);


// router.get('/invoice');


export { router as invoicesRouter };
