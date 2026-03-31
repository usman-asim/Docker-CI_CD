import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuth, createProduct);
router.put('/:id', requireAuth, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

export default router;
