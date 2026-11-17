import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import recintosRouter from './routes/recintos.js';
import eventosRouter from './routes/eventos.js';
import entradasRouter from './routes/entradas.js';

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Enrutadores
app.use('/recintos', recintosRouter);
app.use('/eventos/entradas', entradasRouter);
app.use('/eventos', entradasRouter);
app.use('/eventos', eventosRouter);
app.use('/', entradasRouter);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Conectado exitosamente a MongoDB en ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
  });

export { app };
export default app;
