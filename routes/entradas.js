import express from 'express';
import Evento from '../models/eventos.js';

const router = express.Router();

// GET /eventos/entradas/:idEvento/:tipoEntrada - obtiene precio y disponibles de una entrada para un evento
router.get([
  '/:idEvento/:tipoEntrada',
  '/entradas/:idEvento/:tipoEntrada',
  '/eventos/entradas/:idEvento/:tipoEntrada'
], async (req, res) => {
  try {
    const { idEvento, tipoEntrada } = req.params;
    const evento = await Evento.findById(idEvento);
    if (!evento) {
      return res.status(404).json({ error: `Error obteniendo datos de entrada para evento ${idEvento}` });
    }

    const entrada = evento.entradas.find(
      e => e.tipo.toLowerCase() === tipoEntrada.toLowerCase()
    );
    if (!entrada) {
      return res.status(404).json({ error: `Error obteniendo datos de entrada para evento ${idEvento}` });
    }

    return res.status(200).json({
      resultado: {
        precio: entrada.precio,
        disponibles: entrada.disponibles
      }
    });
  } catch (err) {
    return res.status(404).json({ error: `Error obteniendo datos de entrada para evento ${req.params.idEvento}` });
  }
});

// PUT /eventos/entradas/:idEvento/:tipoEntrada/:cantidad - resta cantidad de entradas disponibles
router.put([
  '/:idEvento/:tipoEntrada/:cantidad',
  '/entradas/:idEvento/:tipoEntrada/:cantidad',
  '/eventos/entradas/:idEvento/:tipoEntrada/:cantidad'
], async (req, res) => {
  try {
    const { idEvento, tipoEntrada, cantidad } = req.params;
    const numCantidad = parseInt(cantidad, 10);
    if (isNaN(numCantidad) || numCantidad <= 0) {
      return res.status(404).json({ error: `Error actualizando entradas del evento ${idEvento}` });
    }

    const evento = await Evento.findById(idEvento);
    if (!evento) {
      return res.status(404).json({ error: `Error actualizando entradas del evento ${idEvento}` });
    }

    const entrada = evento.entradas.find(
      e => e.tipo.toLowerCase() === tipoEntrada.toLowerCase()
    );
    if (!entrada || entrada.disponibles < numCantidad) {
      return res.status(404).json({ error: `Error actualizando entradas del evento ${idEvento}` });
    }

    entrada.disponibles -= numCantidad;
    const eventoActualizado = await evento.save();
    return res.status(200).json({ resultado: eventoActualizado });
  } catch (err) {
    return res.status(404).json({ error: `Error actualizando entradas del evento ${req.params.idEvento}` });
  }
});

export default router;
