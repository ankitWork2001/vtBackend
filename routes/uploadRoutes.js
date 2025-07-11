import express from 'express';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

// Route: POST /api/upload/:role
router.post('/:role', upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: req.file.path });
});

export default router;
