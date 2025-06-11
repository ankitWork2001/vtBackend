import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, unique: true, required: true },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    status: { type: String, enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending' },
    from: {
        companyName: { type: String },
        address: { type: String }
    },
    to: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        customerName: { type: String, required: true },
        customerAddress: { type: String },
        customerEmail: { type: String }
    },
    items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
            totalItemPrice: { type: Number, required: true }
        }
    ],
    subTotal: { type: Number, required: true },
    taxRate: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    relatedOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    sentToCustomer: { type: Boolean, default: false },
    sentDate: { type: Date },
    paymentDetails: {
        method: String,
        transactionId: String,
        paidDate: Date
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
