import { OrderModel } from '../models/Order.js';
import mongoose from 'mongoose';
import { UserModel } from '../models/User.js'
import { PickupModel } from '../models/PickupInfo.js';
import { Wallet } from '../models/Wallet.js';
import { AddtoCartmodel } from '../models/AddToCart.js';
import { Transaction } from '../models/Transaction.js';
import { createInvoiceFromOrder } from './invoiceController.js';

export const confirmOrder = async (req, res) => {

    const {serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate } = req.body;
    const userId = req.user.id;
    console.log(userId)

     if (!userId || !serviceId || !deliveryAddress || !deliveryDate || !totalBill || !pickupDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newOrder = new OrderModel({userId, serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


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

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartItems = await AddtoCartmodel.find({ userId });
        if (cartItems.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty" });
        }

        const subTotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        const wallet = await Wallet.findOne({ ownerId: userId });
        if (!wallet) {
            return res.status(404).json({ success: false, message: "Wallet not found" });
        }

        if (wallet.balance < subTotal) {
            return res.status(400).json({
                success: false,
                message: "Insufficient wallet balance",
                walletBalance: wallet.balance,
                totalAmount: subTotal
            });
        }

        // Deduct user balance
        wallet.balance -= subTotal;
        await wallet.save();

        // Find admin wallet
        const adminWallet = await Wallet.findOne({ ownerType: 'Admin' });
        if (!adminWallet) {
            return res.status(404).json({ success: false, message: "Admin wallet not found" });
        }

        // Credit admin wallet
        adminWallet.balance += subTotal;
        await adminWallet.save();

        // Create transactions
        await Transaction.create({
            walletId: wallet._id,
            amount: subTotal,
            type: 'debit',
            description: `Order payment (Order ID: will generate below)`,
            paymentMode: 'manual',
        });

        await Transaction.create({
            walletId: adminWallet._id,
            amount: subTotal,
            type: 'credit',
            description: `Order received from user ${userId}`,
            paymentMode: 'manual',
        });

        // Pickup info
        const pickupRecord = await PickupModel.findOne({ userId }).sort({ createdAt: -1 });
        if (!pickupRecord || !pickupRecord.pickupDate) {
            return res.status(400).json({ success: false, message: "Pickup date not found" });
        }

        const pickupDate = pickupRecord.pickupDate;
        const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const services = cartItems.map(item => ({
            serviceId: item.serviceId,
            serviceName: item.serviceName || "Service",
            quantity: item.quantity,
            unit: item.unit || "item",
            unitPrice: item.price,
            totalItemPrice: item.price * item.quantity
        }));

        const discountAmount = subTotal * 0.05;
        const totalAmount = subTotal - discountAmount;

        const orderId = generate14DigitID();

        // Update transaction descriptions with orderId
        await Transaction.updateMany(
            { walletId: wallet._id, description: /Order payment/ },
            { description: `Order payment (Order ID: ${orderId})` }
        );

        await Transaction.updateMany(
            { walletId: adminWallet._id, description: /Order received/ },
            { description: `Order received from user ${userId} (Order ID: ${orderId})` }
        );

        const newOrder = new OrderModel({
            orderId,
            userId,
            pickupDate,
            deliveryDate,
            orderType: req.body.orderType || "Wash & Fold",
            services,
            subTotal,
            discountAmount,
            totalAmount,
            paymentStatus: "Paid",
            paymentMethod: "Wallet"
        });

        await newOrder.save();

        user.totalOrdersCount = (user.totalOrdersCount || 0) + 1;
        await user.save();

        await AddtoCartmodel.deleteMany({ userId });

        let invoice;
        try {
            invoice = await createInvoiceFromOrder(newOrder, user, pickupRecord);
        } catch (e) {
            console.error("Invoice creation failed:", e.message);
        }

        return res.status(201).json({
            success: true,
            message: "Order created successfully, payment deducted, and admin wallet credited",
            orderId: newOrder._id,
            updatedWalletBalance: wallet.balance,
            data: newOrder,
            invoice
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

    const validStatuses = OrderModel.schema.path('status').enumValues;

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