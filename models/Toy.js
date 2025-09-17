import mongoose, { model, Schema } from 'mongoose'

const toySchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: {
    type: String,
    enum: ['Peluches', 'Juegos de mesa', 'Vehículos', 'Figuras de acción'],
    required: true,
  },
})

export const Toy = mongoose.models.Toy || model('Toy', toySchema)
