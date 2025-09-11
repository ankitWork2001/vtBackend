import { UserModel } from "../models/User.js";

// GET /api/user/profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
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


export const updateUserProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profileImageUrl = req.file.path;

    await user.save();

    return res.status(200).json({
      message: "Profile image updated successfully",
      profileImageUrl: user.profileImageUrl,
      userId: user._id
    });

  } catch (error) {
    console.error("Server error in updateUserProfileImage:", error);

    return res.status(500).json({
      message: "Server error during image upload",
      error: error.message || "Unknown error"
    });
  }
};
