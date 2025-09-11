import express from 'express';
const router = express.Router();
import {
  createUserWallet,
  getWallet,
  createAdminWallet,
  getAdminWallet,
  deleteWallet
} from "../controllers/walletController.js";

import {
  creditWallet,
  debitWallet,
  getTransactions
} from "../controllers/transactionController.js";

import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

// User wallet
router.post('/wallet/create', verifyToken, authorizeRoles('user'), createUserWallet);
router.get('/wallet', verifyToken, authorizeRoles('user', 'admin'), getWallet);
router.delete('/deletewallet', verifyToken, authorizeRoles('user', 'admin'), deleteWallet);

// Admin wallet
router.post('/wallet/admin/create', verifyToken, authorizeRoles('admin'), createAdminWallet);
router.get('/wallet/admin', verifyToken, authorizeRoles('admin'), getAdminWallet);

// Transactions
router.post('/wallet/credit', verifyToken, authorizeRoles('admin', 'user'), creditWallet);
router.post('/wallet/debit', verifyToken, authorizeRoles('admin', 'user'), debitWallet);
router.get('/wallet/:walletId/transactions', verifyToken, authorizeRoles('admin', 'user'), getTransactions);

export { router as walletRouter };
