import dns from 'node:dns'
import mongoose from 'mongoose'

// En Windows/local usamos DNS de Google para resolver MongoDB SRV.
// Vercel utiliza su propio sistema DNS.
if (!process.env.VERCEL) {
  dns.setServers(['8.8.8.8', '8.8.4.4'])
}

async function connectDatabase() {
    if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('La variable MONGODB_URI no está configurada')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })

    return mongoose.connection
  } catch (error) {
    throw new Error(
      `Error de conexión a MongoDB: ${error.message}`
    )
  }
}

export default connectDatabase