import multer from 'multer';
import path from 'path';
import { IMAGE_MAX_SIZE } from '../constants/config.constants';

// Multer configuration
export const uploadImageMulter = multer({
  dest: path.join(__dirname, '../uploads/'),
  limits: { fileSize: IMAGE_MAX_SIZE },
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

