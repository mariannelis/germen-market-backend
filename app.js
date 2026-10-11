import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import connectDatabase from './config/db.js'

import productRoutes from './routes/product-routes.js'
import authRoutes from './routes/auth-routes.js'
import orderRoutes from './routes/order-routes.js'

const app = express()

// Middlewares generales
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Ruta de comprobación.
// No necesita conectarse a MongoDB.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API de Germen Latin Market funcionando',
  })
})

// Conecta MongoDB antes de acceder a las rutas que usan la base de datos
app.use(async (req, res, next) => {
  try {
    await connectDatabase()
    next()
  } catch {
    return res.status(500).json({
      success: false,
      message: 'No se pudo conectar con la base de datos.',
    })
  }
})

// Rutas de la API
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada.',
  })
})

// Manejo general de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor.',
  })
})

export default app