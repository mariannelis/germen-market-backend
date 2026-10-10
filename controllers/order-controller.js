import Order from '../models/order-model.js'

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      address,
      city,
      country,
      postalCode,
      items,
      subtotal,
      shipping,
      total,
    } = req.body

    if (
      !customerName ||
      !customerEmail ||
      !phone ||
      !address ||
      !city ||
      !country ||
      !postalCode ||
      !items?.length
    ) {
      return res.status(400).json({
        message: 'Faltan datos obligatorios del pedido.',
      })
    }

    const order = await Order.create({
      user: req.user.id,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      country,
      postalCode,
      items,
      subtotal,
      shipping,
      total,
    })

    return res.status(201).json({
      message: 'Pedido creado correctamente.',
      order,
    })
  } catch (error) {
    console.error('Error creating order:', error)

    return res.status(500).json({
      message: 'No se pudo crear el pedido.',
      error: error.message,
    })
  }
}

// Obtener todos los pedidos - solo administrador
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })

    return res.status(200).json({
      orders,
    })
  } catch (error) {
    console.error('Error getting orders:', error)

    return res.status(500).json({
      message: 'No se pudieron obtener los pedidos.',
    })
  }
}

// Obtener pedidos del usuario autenticado
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 })

    return res.status(200).json({
      orders,
    })
  } catch (error) {
    console.error('Error getting user orders:', error)

    return res.status(500).json({
      message: 'No se pudieron obtener tus pedidos.',
    })
  }
}

// Cambiar estado del pedido - solo administrador
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, isPaid } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(status !== undefined && { status }),
        ...(isPaid !== undefined && { isPaid }),
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!order) {
      return res.status(404).json({
        message: 'Pedido no encontrado.',
      })
    }

    return res.status(200).json({
      message: 'Pedido actualizado correctamente.',
      order,
    })
  } catch (error) {
    console.error('Error updating order:', error)

    return res.status(500).json({
      message: 'No se pudo actualizar el pedido.',
    })
  }
}