import dns from 'node:dns'
import mongoose from 'mongoose'

dns.setServers(['8.8.8.8', '8.8.4.4'])

async function connectDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('La variable MONGODB_URI no está configurada')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.log('Conexión exitosa a MongoDB')
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDatabase