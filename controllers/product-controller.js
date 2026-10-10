import Product from '../models/product-model.js'

// Obtener todos los productos
export async function getProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
    })
  }
}

// Crear un producto
export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      product,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No se pudo crear el producto',
    })
  }
}

// Obtener un producto por id
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Id de producto no válido',
    })
  }
}

// Actualizar producto
export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      product,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No se pudo actualizar el producto',
    })
  }
}

// Eliminar producto
export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No se pudo eliminar el producto',
    })
  }
}