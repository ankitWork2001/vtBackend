import { NotificationModel } from '../models/NotificationSettings.js';



// GET /api/notifications/settings

export const getNotificationSettings = async (req, res) => {

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const settings = await NotificationModel.findOne({ userId });

    if (!settings) {
      return res.status(404).json({ message: "Notification settings not found" });
    }

    res.status(200).json({ message: "Notification settings fetched", data: settings });
  } 
  
  catch (error) {
    console.error("Error fetching notification settings:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// PUT /api/notifications/settings
export const updateNotificationSettings = async (req, res) => {

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };

    const updatedSettings = await NotificationModel.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Notification settings updated", data: updatedSettings });
  } 
  
  catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
