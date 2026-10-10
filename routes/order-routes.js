import express from 'express'

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} from '../controllers/order-controller.js'

import {
  protect,
  requireAdmin,
} from '../middleware/auth-middleware.js'

const router = express.Router()

// Cliente o administrador autenticado crea un pedido
router.post('/', protect, createOrder)

// Usuario autenticado consulta sus pedidos
router.get('/my-orders', protect, getMyOrders)

// Administrador consulta todos los pedidos
router.get('/', protect, requireAdmin, getOrders)

// Administrador actualiza estado o pago
router.put(
  '/:id/status',
  protect,
  requireAdmin,
  updateOrderStatus
)

export default router