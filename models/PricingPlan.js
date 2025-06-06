import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    description: { type: String }, 
    features: [{ type: String }], 
    monthlyPrice: { type: Number, required: true },
    yearlyPrice: { type: Number, required: true }, 
    currency: { type: String, default: '₹' }, 
    isPopular: { type: Boolean, default: false }, 
    status: { type: String, enum: ['active', 'inactive', 'draft'], default: 'active' },
    sortOrder: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const PricingModel = mongoose.model("PricingPlan", pricingPlanSchema);
