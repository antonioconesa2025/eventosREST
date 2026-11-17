import mongoose from 'mongoose';
import { entradaSchema } from './entradas.js';

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [5, 'El nombre debe tener al menos 5 caracteres'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es obligatoria']
  },
  entradas: [entradaSchema],
  recinto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recinto',
    required: [true, 'El recinto es obligatorio']
  }
});

const Evento = mongoose.model('Evento', eventoSchema);

export { eventoSchema, Evento };
export default Evento;
