import mongoose from 'mongoose';

const recintoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [5, 'El nombre debe tener al menos 5 caracteres'],
    trim: true
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    minlength: [10, 'La dirección debe tener al menos 10 caracteres'],
    trim: true
  },
  localidad: {
    type: String,
    required: [true, 'La localidad es obligatoria'],
    minlength: [3, 'La localidad debe tener al menos 3 caracteres'],
    trim: true
  },
  aforoMaximo: {
    type: Number,
    required: [true, 'El aforo máximo es obligatorio']
  }
});

const Recinto = mongoose.model('Recinto', recintoSchema);

export { recintoSchema, Recinto };
export default Recinto;
