import {Wallet} from '../models/Wallet.js';

export const createUserWallet = async (req, res) => {
  try {
    const userId = req.user.id;
console.log(userId)
    const existing = await Wallet.findOne({ ownerType: 'User', ownerId: userId });
    if (existing) return res.status(400).json({ message: 'Wallet already exists' });

    const wallet = new Wallet({
      ownerType: 'User',
      ownerId: userId,
      balance: 5000,
    });

    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWallet = async (req, res) => {
  try {
    const { ownerType, ownerId } = req.query;

    let wallet;
    if (ownerType === 'Admin') {
      wallet = await Wallet.findOne({ ownerType: 'Admin' });
    } else {
      wallet = await Wallet.findOne({ ownerType: 'User', ownerId });
    }

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAdminWallet = async (req, res) => {
  try {
    const ownerId = req.user.id;
    let wallet = await Wallet.findOne({ ownerType: 'Admin' });

    if (wallet) {
      return res.status(400).json({ message: 'Admin wallet already exists' });
    }

    wallet = new Wallet({
      ownerType: 'Admin',
      ownerId,
      balance: 0,
    });

    await wallet.save();
    res.status(201).json({ message: 'Admin wallet created', wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ ownerType: 'Admin' });

    if (!wallet) return res.status(404).json({ message: 'Admin wallet not found' });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// dummy controller for deleting wallet
export const deleteWallet = async (req, res) => {
  try {
    const userId = req.user.id; // user id from token/middleware

    const wallet = await Wallet.findOneAndDelete({ ownerType: "User", ownerId: userId });

    if (!wallet) {
      return res.status(404).json({ success: false, message: "Wallet not found" });
    }

    res.status(200).json({ success: true, message: "Wallet deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting wallet", error: error.message });
  }
};
