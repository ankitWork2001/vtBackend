import {OrderModel} from '../models/Order.js';
import mongoose from 'mongoose';


export const confirmOrder = async (req, res) => {
      const { userId, serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate } = req.body;

    
    if (!userId || !serviceId || !deliveryAddress || !deliveryDate || !totalBill || !pickupDate) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newOrder = new OrderModel({ userId, serviceId, deliveryAddress, deliveryDate, totalBill, pickupDate });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


// to get all orders of a user
export const toGetOrders = async (req, res) => {
    try{
        const orders = await OrderModel.find({ userId });
        res.json(orders);

    }catch(err){
        res.json({
            status:500,
            message:err.message
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

};