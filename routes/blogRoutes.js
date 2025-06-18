import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import * as blogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/allblog", blogController.allBlog);
router.get("/blog/:id", blogController.blogById);
router.post("/createblog", verifyToken, blogController.createBlog);
router.put("/updateblog/:id", verifyToken, blogController.updateBlog);
router.delete("/deleteblog/:id", verifyToken, blogController.deleteBlog);

export { router as blogRouter };
