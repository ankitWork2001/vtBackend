import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    description: {
        type: String
    },
    paymentMode: {
        type: String,
        enum: ['razorpay', 'manual', 'cash'],
        default: 'manual'
    },
    paymentDetails: {
        paymentId: String,
        orderId: String,
        status: String,
        receipt: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
