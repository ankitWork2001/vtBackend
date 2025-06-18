import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Cloudinary image URL
  },
  category: {
    type: "string",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const BlogModel = mongoose.model("Blog", blogSchema);
