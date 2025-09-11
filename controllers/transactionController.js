import {Wallet} from '../models/Wallet.js';
import {Transaction} from '../models/Transaction.js';

export const creditWallet = async (req, res) => {
  try {
    const { walletId, amount, description, paymentMode, paymentDetails } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    wallet.balance += amount;

    const transaction = new Transaction({
      walletId,
      amount,
      type: 'credit',
      description,
      paymentMode,
      paymentDetails,
    });

    await transaction.save();
    await wallet.save();

    res.status(200).json({ message: 'Wallet credited', wallet, transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const debitWallet = async (req, res) => {
  try {
    const { walletId, amount, description } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    if (wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    wallet.balance -= amount;

    const transaction = new Transaction({
      walletId,
      amount,
      type: 'debit',
      description,
    });

    await transaction.save();
    await wallet.save();

    res.status(200).json({ message: 'Wallet debited', wallet, transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { walletId } = req.params;

    const transactions = await Transaction.find({ walletId }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
