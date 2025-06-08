import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
