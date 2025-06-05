const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    siteName: { type: String, default: 'FreshFold' },
    copyrightText: { type: String, default: 'All rights Reserved@FreshFold' },
    logoUrl: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Setting", settingSchema);