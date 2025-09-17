//Aquí vamos a importar la librería para enlazar al servidor mongo
import mongoose from 'mongoose'

//Vamos a realizar una conexión asincrónica
const conexion = async () => {
  try {
    await mongoose.connect(process.env.URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error)
  }
}

export default conexion
