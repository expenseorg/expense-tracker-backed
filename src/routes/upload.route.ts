/**
 * This file contains all the upload related routes
 */

import { Router } from 'express';
import { requireAuth } from '../common/middlewares/require-auth';
import { uploadImageMulter } from '../common/config/multer.config';
import { uploadImage } from '../controllers/upload.controller';

//initializer router
const router = Router();

// Route to upload image
router.post(
  '/image',
  requireAuth,
  uploadImageMulter.single('image'),
  uploadImage
);

// export clubbed routes
export default router;
