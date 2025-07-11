import express from 'express';
const router = express.Router();
import {verifyToken} from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import * as invoiceController from '../controllers/invoiceController.js';

// GET /api/invoices/:invoiceId
router.get('/invoices/:invoiceId',verifyToken,authorizeRoles('admin'), invoiceController.getInvoiceById);

// POST /api/invoices
router.post('/invoices',verifyToken,authorizeRoles('admin'), invoiceController.createInvoice);

// this is an extra route - the ivoices are created at the time of create order
// router.post('/invoicesfromorder',verifyToken,authorizeRoles('admin'), createInvoiceFromOrder);

// PUT /api/invoices/:invoiceId
router.put('/invoices/:invoiceId',verifyToken,authorizeRoles('admin'), invoiceController.updateInvoice);

// POST /api/invoices/:invoiceId/send
router.post('/invoices/:invoiceId/send',verifyToken,authorizeRoles('admin'), invoiceController.sendInvoice);

// GET /api/invoices/:invoiceId/download
router.get('/invoices/:invoiceId/download',verifyToken,authorizeRoles('admin'), invoiceController.downloadInvoice);

export { router as invoicesRouter };
