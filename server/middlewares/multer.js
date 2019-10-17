import multer from 'multer';
import path from 'path';
import { IMAGES_PATH } from '../const'
import logger from '../logger';

const getDestinationAccordingType = (type) => {
  switch (type) {
      case 'images':
          return IMAGES_PATH;
      default:
          logger.error('No destination found');
          return false;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getDestinationAccordingType(req.params.type))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb(`File upload only supports the following filetypes - ${filetypes}`);
};

export default multer({
  storage,
  fileFilter,
  limits : {
    fileSize : 1000000,
    files    : 1
  }
});
