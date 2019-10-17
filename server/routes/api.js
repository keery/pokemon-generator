import { Router } from 'express';
import { multer as upload } from '../middlewares';
import { files } from '../logic';

const router = new Router();

router.post('/file/upload/:type(images)', upload.single('file'), files.uploadFile);

export default router;
