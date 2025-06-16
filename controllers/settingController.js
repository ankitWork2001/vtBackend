import { SettingModel } from "../models/Setting.js";
// admin controllers
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
        const { logoUrl } = req.body;

        if (!logoUrl) {
            return res.status(400).json({ success: false, message: "Logo URL is required" });
        }

        const updated = await SettingModel.findOneAndUpdate(
            {},
            { logoUrl, updatedAt: Date.now() },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, message: "Logo updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
