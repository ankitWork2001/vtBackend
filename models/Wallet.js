import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    ownerType: {
        type: String,
        enum: ['User', 'Admin'],
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'ownerType',
        default: null
    },
    balance: {
        type: Number,
        default: 0
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

export const Wallet = mongoose.model("Wallet", walletSchema);