import express from 'express';
import { getProducts , getProductById , createProduct , getProductByCategoryAndVariant} from '../controller/productController.js';
const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.post('/category-variant' , getProductByCategoryAndVariant);
export default router;