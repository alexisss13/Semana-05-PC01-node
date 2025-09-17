import express from 'express'
import { body, validationResult } from 'express-validator'
import conexion from './database/conexion.js'
import { Toy } from './models/Toy.js'

// Inicializamos express
const app = express()
// Leemos el valor del puerto a través de process.env y de manera default establecemos 3000
const PORT = process.env.PORT || 3000

// Middleware general - usamos el nativo de express
app.use(express.json()) // Para APIs que reciben JSON
app.use(express.urlencoded({ extended: true })) // Para formularios HTML (EJS)

//El método para conectar a la base de datos desde db.js
conexion()

app.set('view engine', 'ejs') // Habilitamos EJS como motor de plantillas
app.set('views', './views') // Carpeta donde estarán los archivos .ejs
app.use(express.static('public')) // Para archivos estáticos, en este caso el css

// Ruta para renderizar la vista
// --------------------
app.get('/', async (req, res) => {
  try {
    const toys = await Toy.find()
    // Convertimos _id a string
    const toysData = toys.map((toy) => ({
      ...toy.toObject(),
      _id: toy._id.toString(),
    }))
    res.render('index', { toys: toysData, errors: [] })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar juguetes')
  }
})

// Métodos CRUD

// Crear un nuevo Toy
app.post(
  '/productos', // POST para crear un juguete
  [
    // Validaciones con express-validator
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('precio')
      .isFloat({ gt: 0 })
      .withMessage('El precio debe ser un número mayor a 0'),
    body('stock')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un entero >= 0'),
    body('categoria')
      .isIn(['Peluches', 'Juegos de mesa', 'Vehículos', 'Figuras de acción'])
      .withMessage('Categoría inválida'),
  ],
  async (req, res) => {
    // Capturar errores de validación
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const toyData = req.body
      const newToy = await Toy.create(toyData)
      res.status(201).json({ success: true, data: newToy })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
)

// Listar todos los Toys
app.get('/productos', async (req, res) => {
  try {
    const toys = await Toy.find()
    res.json(toys)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Obtener un solo Toy por id
app.get('/productos/:id', async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id)
    if (!toy)
      return res
        .status(404)
        .json({ success: false, message: 'Toy no encontrado' })
    res.json(toy)
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Actualizar un Toy
app.put(
  '/productos/:id',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('precio')
      .isFloat({ gt: 0 })
      .withMessage('El precio debe ser un número mayor a 0'),
    body('stock')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un entero >= 0'),
    body('categoria')
      .isIn(['Peluches', 'Juegos de mesa', 'Vehículos', 'Figuras de acción'])
      .withMessage('Categoría inválida'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const updatedToy = await Toy.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      if (!updatedToy)
        return res
          .status(404)
          .json({ success: false, message: 'Toy no encontrado' })
      res.json({ success: true, data: updatedToy })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
)

// Eliminar un Toy
app.delete('/productos/:id', async (req, res) => {
  try {
    const deletedToy = await Toy.findByIdAndDelete(req.params.id)
    if (!deletedToy)
      return res
        .status(404)
        .json({ success: false, message: 'Toy no encontrado' })
    res.json({ success: true, message: 'Toy eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
