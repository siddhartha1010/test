import { Router } from 'express';
import { getProducts } from '../controllers/orderController';
import { placeOrder } from '../controllers/orderController';

const router = Router();

router.get('/getAllProduct', getProducts);
router.post('/placeOrder', placeOrder);

export default router;
