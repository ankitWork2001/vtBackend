import { BlogModel } from "../models/Blog.js";

//get all blogs
export const allBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res
        .status(400)
        .json({ success: false, message: "Blogs not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully found all blogs.",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//get blog by id
export const blogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Blog found successfully", data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//create blog
export const createBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    const { title, subTitle, description, imageUrl, category } = req.body;
    if (
      title == null ||
      subTitle == null ||
      description == null ||
      imageUrl == null ||
      category == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter information in all fields",
      });
    }
    const newBlog = new BlogModel({
      title,
      subTitle,
      description,
      imageUrl,
      category,
      createdBy: userId, // Use the user ID from the request
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: err.message,
    });
  }
};

//update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const userId = req.user.id;

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await BlogModel.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res
        .status(400)
        .json({ success: false, message: "blog not found with this ID" });
    }
    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      data: deleteBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
