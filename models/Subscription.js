const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
