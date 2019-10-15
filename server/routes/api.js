import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
    res.json('YOUR RESPONSE');
});

router.post('/', (req, res) => {

});

export default router;
