// import { DashboardModel } from '../models/Dashboard.js';

// GET /api/user/dashboard
// export const getDashboardData = async (req, res) => {
//   try {
//     const { userId } = req.query;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const dashboardData = await DashboardModel.findOne({ userId });

//     if (!dashboardData) {
//       return res.status(404).json({ message: "Dashboard not found" });
//     }

//     res.status(200).json({ message: "Dashboard data fetched", data: dashboardData });
//   } catch (error) {
//     console.error("Error fetching dashboard:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

import { DashboardModel } from '../models/Dashboard.js';
import { OrderModel } from '../models/Order.js'; 
import mongoose from 'mongoose';

// 1. GET /api/dashboard/summary
export const getDashboardSummary = async (req, res) => {
  try {
    const { userId } = req.query;
    // console.log("Fetching dashboard summary for userId:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const dashboard = await DashboardModel.findOne({ userId: new mongoose.Types.ObjectId(userId)});
    // console.log("Dashboard data:", dashboard);

    if (!dashboard) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.status(200).json(dashboard);
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. GET /api/sales/details
export const getSalesDetails = async (req, res) => {
  try {

    const orders = await OrderModel.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const weeklySales = [1000, 1500, 1200, 1800]; // You can compute based on `orderDate` if needed

    res.status(200).json({
      weeklySales,
      totalRevenue,
      bestSellingService: "Wash & Fold", // You can compute this later dynamically
    });
  } catch (err) {
    console.error("Sales details error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4. PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!['Pending Pickup', 'Processing', 'In Transit', 'Completed', 'On Hold', 'Rejected', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await OrderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 5. POST /api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    // Assuming token-based auth
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
