import { Router } from 'express';
import { files } from '../logic';

const router = new Router();

router.get('/file/upload/:type(images)', files.uploadFile);

export default router;
