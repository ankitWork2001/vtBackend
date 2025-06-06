
import mongoose from "mongoose";


const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  greeting: String,
  walletBalance: Number,
  activeOrders: Number,
  totalOrders: Number,
  referralEarnings: Number,
  subscriptionPlan: String,
  recentOrders: [Object],
  notifications: [Object],
  updatedAt: { type: Date, default: Date.now },
});


export const DashboardModel = mongoose.model("Dashboard", dashboardSchema);

