const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/pickup', require('./routes/pickupRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/todo', require('./routes/todoRoutes'));
app.use('/api/plans', require('./routes/pricingPlanRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/conversations', require('./routes/conversationRoutes'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
