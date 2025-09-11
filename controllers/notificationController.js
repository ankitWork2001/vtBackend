import { NotificationModel } from '../models/NotificationSettings.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// GET /api/notifications/settings
export const getNotificationSettings = async (req, res) => {
  try {
    const token = req.cookies.itoken;

    if (!token) {
      return res.status(400).json({ success: false, message: "User token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Try finding existing settings
    let settings = await NotificationModel.findOne({ userId });

    // If not found , we will create with defaults settings
    if (!settings) {
      settings = new NotificationModel({ userId });
      await settings.save();
      return res.status(201).json({
        success: true,
        message: "Default notification settings created",
        data: settings,
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification settings fetched",
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// PUT /api/notifications/settings
export const updateNotificationSettings = async (req, res) => {
  try {
    const token = req.cookies.itoken;

    if (!token) {
      return res.status(400).json({ success: false, message: "User token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const updatedData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const updatedSettings = await NotificationModel.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true, upsert: true } // upsert ensures it creates if not found
    );

    res.status(200).json({
      success: true,
      message: "Notification settings updated",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
