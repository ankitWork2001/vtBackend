import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
  let folder = 'laundry_app/misc';

  if (req.originalUrl.includes('/user/')) {
    folder = 'laundry_app/users';
  } else if (req.originalUrl.includes('/admin')) {
    folder = 'laundry_app/admins';
  } else if (req.originalUrl.includes('/team-members')) {
    folder = 'laundry_app/teams';
  } else if (req.originalUrl.includes('/settings')) {
    folder = 'laundry_app/admins';
  }

  return {
    folder,
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  };
}
});

export const upload = multer({ storage });