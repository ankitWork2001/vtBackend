import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
}, { timestamps: true });

export const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);
