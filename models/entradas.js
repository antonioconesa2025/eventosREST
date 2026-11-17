import mongoose from 'mongoose';

const entradaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: [true, 'El tipo de entrada es obligatorio'],
    minlength: [3, 'El tipo de entrada debe tener al menos 3 caracteres'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  disponibles: {
    type: Number,
    required: [true, 'Las entradas disponibles son obligatorias'],
    min: [0, 'Las entradas disponibles no pueden ser negativas']
  }
});

const Entrada = mongoose.model('Entrada', entradaSchema);

export { entradaSchema, Entrada };
export default entradaSchema;
