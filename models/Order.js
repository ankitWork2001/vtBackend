import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    customerAddress: { type: String },
    orderDate: { type: Date, default: Date.now },
    pickupDate: { type: Date },
    deliveryDate: { type: Date },
    orderType: {
        type: String,
        enum: [
            'Wash & Fold', 'Dry Cleaning', 'Stain Removal', 'Steam Press',
            'Wash & Iron', 'Ironing Only', 'Shoe Cleaning', 'Curtain & Bedding Cleaning'
        ],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending Pickup', 'Processing', 'In Transit', 'Completed', 'On Hold', 'Rejected', 'Cancelled'],
        default: 'Pending Pickup'
    },
    services: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
            serviceName: { type: String, required: true },
            quantity: { type: Number, required: true },
            unit: { type: String, enum: ['kg', 'item', 'load', 'sqft', 'unit'], required: true },
            unitPrice: { type: Number, required: true },
            totalItemPrice: { type: Number, required: true }
        }
    ],
    subTotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Unpaid', 'Refunded'], default: 'Unpaid' },
    paymentMethod: { type: String },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const OrderModel = mongoose.model("Order", orderSchema);
