import { SubscriptionModel } from "../models/Subscription.js"; 

// Create a new subscription
export const createSubscription = async (req, res) => {
    try {
        const { planId, startDate, endDate } = req.body;
        const userId = req.user.id; 
        
        const subscription = await SubscriptionModel.create({
            userId,
            planId,
            startDate,
            endDate
        });

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create subscription", error: error.message });
    }
};

// Get all subscriptions for the authenticated user
export const getSubscription = async (req, res) => {
    try {
        const subscriptions = await SubscriptionModel.find({ userId: req.user.id }).populate("planId");
        if(!subscriptions) res.status(400).json({success:false,message:"Subscription not found"})

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get subscriptions", error: error.message });
    }
};

// Cancel a subscription by ID
export const cancelSubscription = async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await SubscriptionModel.findById(id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        subscription.status = "cancelled";
        await subscription.save();

        res.status(200).json({ success: true, message: "Subscription cancelled", data: subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to cancel subscription", error: error.message });
    }
};

// Update a subscription by ID (e.g. extend, change plan)
export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { planId, endDate } = req.body;

        const isExpired = new Date(endDate) < new Date();
        const status = isExpired ? "expired" : "active"; 

        const updated = await SubscriptionModel.findByIdAndUpdate(
            id,
            { planId, endDate, status }, 
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated",
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update subscription",
            error: error.message
        });
    }
};

