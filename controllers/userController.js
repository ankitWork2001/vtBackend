import { UserModel } from "../models/User.js";
import bcrypt from 'bcryptjs';

// GET /api/user/profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/user/profileupdate
export const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, address, phone } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/user/profileAcc
export const updateUserAccount = async (req, res) => {
  try {
    const user = await UserModel.findById(req.query.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { email, password } = req.body;

    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: "Account settings updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

