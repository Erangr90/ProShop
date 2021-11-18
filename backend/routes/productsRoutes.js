// Node packages
import express from 'express';
// Initialize express Router
const router = express.Router();
// Actions
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createReview,
  getTopProducts,
} from '../controllers/productsController.js';

// Routes

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);
router.route('/:id/reviews').post(protect, createReview);

export default router;
