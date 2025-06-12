import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

import { testimonialRouter } from "./routes/testimonialRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
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
import connectDB from './config/db.js';

app.use(express.json());

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
})
.catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1); // Exit the process if the database connection fails
});


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cart', cartRouter);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/services', servicesRouter);
app.use('/api/contact', contactRouter);
app.use('/api/pickup', pickupRouter);
app.use('/api/orders', orderRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/events', eventRouter);
app.use('/api/settings', settingRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/todo', todoRouter);
app.use('/api/planpricing', planpricingRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
}
);

