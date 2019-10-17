import { Router } from 'express';
import multer from 'multer';
import { FILES_PATH, FILES_FOLDER } from '../const'
import path from 'path';

const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, FILES_PATH)
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage });

router.post('/file/upload', upload.single('file'), (req, res) => {
    return res.json({
        uploadURL: `http://${req.get('host') + FILES_FOLDER}/${req.file.filename}`,
        status: 200
    });
});

export default router;
