import { OrderModel } from '../models/Order.js';
import mongoose from 'mongoose';
import { UserModel } from '../models/User.js'
import { PickupModel } from '../models/PickupInfo.js';
// export const confirmOrder = async (req, res) => {

//     const {serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate } = req.body;
//     const userId = req.user.id;
//     console.log(userId)

//      if (!userId || !serviceId || !deliveryAddress || !deliveryDate || !totalBill || !pickupDate) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     try {
//         const newOrder = new OrderModel({userId, serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate });
//         const savedOrder = await newOrder.save();
//         res.status(201).json(savedOrder);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


// to get all orders of a user
export const toGetOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await OrderModel.find({ userId });
        res.json(orders);

    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}


//to get a order by its id
export const orderById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid order ID.' });
    }

    try {
        const order = await OrderModel.findById(id);
        if (!order) return res.status(404).json({ error: 'Order not found.' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//to get a cancelled order by its id
export const orderCancelled = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid order ID.' });
    }

    try {
        const order = await OrderModel.findOne({ _id: id, status: 'cancelled' });
        if (!order) return res.status(404).json({ error: 'Cancelled order not found.' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//to get a specific order by its id
export const orderDelivered = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid order ID.' });
    }

    try {
        const order = await OrderModel.findOne({ _id: id, status: 'delivered' });
        if (!order) return res.status(404).json({ error: 'Delivered order not found.' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const generate14DigitID = () => {
    let id = '';
    for (let i = 0; i < 14; i++) {
        const digit = Math.floor(Math.random() * 10);
        id += (i === 0 && digit === 0) ? Math.floor(Math.random() * 9 + 1) : digit;
    }
    return id;
};

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = generate14DigitID();

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get pickup date
        const pickupRecord = await PickupModel.findOne({ userId: new mongoose.Types.ObjectId(userId) } ).sort({ createdAt: -1 });
        
        if (!pickupRecord || !pickupRecord.pickupDate) {
            return res.status(400).json({ success: false, message: "Pickup date not found", pickupRecord });
        }
        const pickupDate = pickupRecord.pickupDate;

        // Calculate delivery date as 7 days from now
        const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const {

            orderType,
            services,
            subTotal,
            discountAmount = 0,
            totalAmount,
            paymentMethod
        } = req.body;

        if (!orderType || !services || !Array.isArray(services) || services.length === 0 || !subTotal || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid required fields"
            });
        }

        const newOrder = new OrderModel({
            orderId,
            userId,
            pickupDate,
            deliveryDate,
            orderType,
            services,
            subTotal,
            discountAmount,
            totalAmount,
            paymentMethod
        });

        await newOrder.save();

        user.totalOrdersCount = (user.totalOrdersCount || 0) + 1;
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        });

    } catch (error) {
        console.error("Order creation failed:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


// GET all orders
export const getAllOrders = async (req, res) => {
    try {
        // const orders = await OrderModel.find().populate('').sort({ createdAt: -1 });
        const orders = await OrderModel.find();
        if (!orders || orders.length === 0) {
            res.status(400).json({ success: false, message: "Order not exist." })
        }
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// GET a specific order
export const getSpecificOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    try {
        // const order = await OrderModel.findById(id).populate('userId');
        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// PUT - Update status of a specific order
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    try {
        const updated = await OrderModel.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true }
        );
        res.status(200).json({ success: true, message: "Order status updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// PUT - Update an order
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { ...updateFields, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order updated", data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// DELETE - Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    try {
        const deleted = await OrderModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// PUT - Update payment status
export const updatePaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const validPayments = ['Paid', 'Unpaid', 'Refunded'];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Order ID" });
    }

    if (!validPayments.includes(paymentStatus)) {
        return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    try {
        const updated = await OrderModel.findByIdAndUpdate(
            id,
            { paymentStatus, updatedAt: Date.now() },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, message: "Payment status updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};