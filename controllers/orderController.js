import mongoose from 'mongoose';
import { OrderModel } from '../models/Order.js';

const validStatuses = ['Pending Pickup', 'Processing', 'In Transit', 'Completed', 'On Hold', 'Rejected', 'Cancelled'];
const validPayments = ['Paid', 'Unpaid', 'Refunded'];

// POST /api/orders - Create Order
// createOrder is commented because this createOrder Controller may used in user side 
// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {

//       customerName,
//       customerAddress,
//       pickupDate,
//       deliveryDate,
//       orderType,
//       services,
//       subTotal,
//       taxAmount = 0,
//       discountAmount = 0,
//       totalAmount,
//       paymentMethod,
//       notes
//     } = req.body;

//     if (!customerName || !orderType || !services || !subTotal || !totalAmount || !userId) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid userId" });
//     }

//     const newOrder = new OrderModel({
//         userId,
//       customerName,
//       customerAddress,
//       pickupDate,
//       deliveryDate,
//       orderType,
//       services,
//       subTotal,
//       taxAmount,
//       discountAmount,
//       totalAmount,
//       paymentMethod,
//       notes
//     });

//     await newOrder.save();

//     res.status(201).json({ success: true, message: "Order created", data: newOrder });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// GET /api/orders - Get All Orders (with optional filters)
export const getAllOrders = async (req, res) => {
  try {
    const filters = req.query || {};
    const orders = await OrderModel.find(filters).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// GET /api/orders/:id - Get Single Order
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

// PUT /api/orders/:id/status - Update Order Status
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

    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// PUT /api/orders/:id - Admin Edit (Full Order Update)
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

// DELETE /api/orders/:id - Delete Order (Soft delete/cancel)
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const deleted = await OrderModel.findByIdAndUpdate(
      id,
      { status: "Cancelled", updatedAt: Date.now() }, // Soft delete
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order cancelled", data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// PUT /api/orders/:id/payment - Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

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
