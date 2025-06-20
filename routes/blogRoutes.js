import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import * as blogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/allblog", blogController.allBlog, blogController.syncServiceCategoriesToBlogCategories);
router.post("/createcategory", verifyToken, blogController.createBlogCategory);
router.get("/categories", blogController.getBlogCategories);
router.post("/createblog", verifyToken, blogController.createBlog);
router.get("/:id", blogController.blogById);
router.put("/updateblog/:id", verifyToken, blogController.updateBlog);
router.delete("/deleteblog/:id", verifyToken, blogController.deleteBlog);



export { router as blogRouter };
