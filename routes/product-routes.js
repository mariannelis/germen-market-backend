import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product-controller.js'

import {
  protect,
  requireAdmin,
} from '../middleware/auth-middleware.js'

const router = Router()

// Rutas públicas
router.get('/', getProducts)
router.get('/:id', getProductById)

// Rutas exclusivas del administrador
router.post(
  '/',
  protect,
  requireAdmin,
  createProduct
)

router.put(
  '/:id',
  protect,
  requireAdmin,
  updateProduct
)

router.delete(
  '/:id',
  protect,
  requireAdmin,
  deleteProduct
)

export default router