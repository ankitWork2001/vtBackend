import { DashboardModel } from '../models/Dashboard.js';

// GET /api/user/dashboard
export const getDashboardData = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const dashboardData = await DashboardModel.findOne({ userId });

    if (!dashboardData) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.status(200).json({ message: "Dashboard data fetched", data: dashboardData });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
