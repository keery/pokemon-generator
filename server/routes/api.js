import { Router } from 'express';
import { files } from '../logic';

const router = new Router();

router.get('/file/upload/:type(images)', files.uploadFile);
router.get('/transloadit/signature', files.getTransloaditSignature);

export default router;
