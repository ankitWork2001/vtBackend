import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, enum: ['kg', 'item', 'load', 'sqft', 'unit'], required: true },
    currency: { type: String, default: '₹' },
    imageUrl: { type: String },
    category: { type: String },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const ServiceModel = mongoose.model("Service", serviceSchema);
