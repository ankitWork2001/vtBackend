import { UserModel } from "../models/User.js";

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
    console.log(req.user.id)
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, address, profileImageUrl ,email } = req.body;

    if (username) user.username = username; // user schema also updated
    if (email) user.email = email;
    if (address) user.address = address;
    if (profileImageUrl) user.profileImageUrl = profileImageUrl;

    const updatedUser = await user.save();
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/user/profileAcc
export const updateUserAccount = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, dob, language } = req.body;

    if (username) user.name = username; 
    if (dob) user.dob = dob; // user schema updated for these 2 changes
    if (language) user.language = language;

    await user.save();
    res.json({ message: "Account settings updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

