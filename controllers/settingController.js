import { SettingModel } from "../models/Setting.js";

// GET /api/settings/general
export const getGeneralSettings = async (req, res) => {
    try {
        const settings = await SettingModel.find();
        if (!settings) {
            return res.status(404).json({ success: false, message: "Settings not found" });
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// PUT /api/settings/general
export const updateGeneralSettings = async (req, res) => {
    try {
        const updateFields = { ...req.body, updatedAt: Date.now() };
        const updatedSettings = await SettingModel.findOneAndUpdate({}, updateFields, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ success: true, message: "Settings updated", data: updatedSettings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// POST /api/settings/general/logo
export const createGeneralSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Logo image file is required" });
    }

    const logoUrl = req.file.path;

    const updated = await SettingModel.findOneAndUpdate(
      { adminId }, 
      {
        logoUrl,
        updatedAt: Date.now(),
        adminId
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Logo uploaded and saved successfully",
      data: updated
    });

  } catch (error) {
    console.error("Logo Upload Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error during logo upload",
      error: error.message
    });
  }
};
