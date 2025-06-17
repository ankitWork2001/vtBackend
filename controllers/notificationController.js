import { NotificationModel } from "../models/NotificationSettings.js";
// admin notification controller
// GET: Fetch notification preferences
export const getNotificationController = async (req, res) => {
  try {
    
    const notification = await NotificationModel.findOne({ userId: req.user.id });
    // const {userId} = req.body;
    // const notification = await NotificationModel.findOne({ userId });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// PUT: Update notification preferences
export const updateNotificationController = async (req, res) => {
  try {
    const updateData = req.body;
    const userId = req.user.id;

    const settings = await NotificationModel.findOneAndUpdate(
      { userId },
      { ...updateData, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Notification updated successfully",
      data: settings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
