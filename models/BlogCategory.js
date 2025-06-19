import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export const BlogCategoryModel = mongoose.model("BlogCategory", blogCategorySchema);
