import mongoose from "mongoose";

const notificationSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    notifyAbout: {
        personalReminders: { type: Boolean, default: false },
        orderUpdates: { type: Boolean, default: true },
        paymentUpdates: { type: Boolean, default: true }
    },
    emailNotifications: {
        communicationEmails: { type: Boolean, default: true },
        marketingEmails: { type: Boolean, default: false },
        serviceEmails: { type: Boolean, default: true },
        securityEmails: { type: Boolean, default: true }
    },
    useDifferentMobileSettings: { type: Boolean, default: false },
    mobileNotificationSettings: {
        pushNotifications: { type: Boolean, default: true }
    },
    updatedAt: { type: Date, default: Date.now }
});

export const NotificationModel = mongoose.model("NotificationSettings", notificationSettingsSchema);
