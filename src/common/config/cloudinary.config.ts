import cloudinary from 'cloudinary';

/**
 * configuration for cloudinary
 * to upload images / videos
 */

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary as any;
