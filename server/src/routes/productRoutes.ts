// src/routes/productRoutes.ts
import { Router } from 'express';
import { getProducts } from '../controllers/orderController';
import { placeOrder } from '../controllers/orderController';

const router = Router();

// Define the route for getting products
router.get('/getAllProduct', getProducts);
router.post('/placeOrder', placeOrder);

export default router;
