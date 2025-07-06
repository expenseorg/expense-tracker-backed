/**
 * This file contains all the upload related routes
 */

import { Request, Response } from 'express';
import cloudinary from '../common/config/cloudinary.config';
import fs from 'fs/promises';
import { handleError } from '../common/utils/handle-error';

/**
 * Controller to upload image
 */
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: '../commons/uploads',
      use_filename: true,
    });

    // Remove file from local server
    await fs.unlink(req.file.path);

    // Return the uploaded image URL
    res.status(200).json({
      url: result.secure_url,
      message: 'Image uploaded successfully',
    });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};
