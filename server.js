import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

import { blogRouter } from "./routes/blogRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { testimonialRouter } from "./routes/testimonialRoutes.js";
import { servicesRouter } from "./routes/serviceRoutes.js";
import { contactRouter } from "./routes/contactRoutes.js";
import { pickupRouter } from "./routes/pickupRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import { notificationRouter } from "./routes/notificationRoutes.js";
import { subscriptionRouter } from "./routes/subscriptionRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { settingRouter } from "./routes/settingRoutes.js";
import { invoicesRouter } from "./routes/invoiceRoutes.js";
import { todoRouter } from "./routes/todoRoutes.js";
import { planpricingRouter } from "./routes/pricingPlanRoutes.js";

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/services", servicesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/pickup", pickupRouter);
app.use("/api/orders", orderRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/events", eventRouter);
app.use("/api/settings", settingRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/todo", todoRouter);
app.use("/api/planpricing", planpricingRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the VT Backend API");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
