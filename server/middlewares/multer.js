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

export default multer({ storage, limits : {
  fileSize : 1000000,
  files    : 1
}});
